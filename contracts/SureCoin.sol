// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SurityInterface.sol";

contract SureCoin is ERC20, Ownable, ReentrancyGuard {
    uint256 private _rewardRate = 0;
    uint256 private _totalStaked = 0;
    uint256 private _rewardPerTokenStored;
    uint256 private _lastUpdateTime;
    uint256 private _displayPrice;
    SurityInterface _interface;

    mapping(address => uint256) private _stakedBalance;
    mapping(address => uint256) private _rewards;
    mapping(address => uint256) private _userRewardsPerTokenPaid;

    event Staked(
        address indexed account,
        address indexed insurance,
        uint256 amount
    );
    event Revoked(
        address indexed account,
        address indexed insurance,
        uint256 amount
    );
    event RewardsClaimed(address indexed account, uint256 amount);
    event RewardRateUpdated(uint256 updatedRewardRate);

    event Buy(address indexed buyer, uint256 amount, uint256 cost);
    event Sell(address indexed seller, uint256 amount, uint256 refund);
    event PriceChange(uint256 time, uint256 value, uint256 marketCap);

    modifier updateReward(address account_) {
        _rewardPerTokenStored = rewardPerStake();
        _lastUpdateTime = block.timestamp;
        _rewards[account_] = earned(account_);
        _userRewardsPerTokenPaid[account_] = _rewardPerTokenStored;
        _;
    }

    constructor() ERC20("SureCoin", "SURE") Ownable(_msgSender()) {
        // expect deployer (owner) to be SurityInterface
        _lastUpdateTime = block.timestamp;
        _interface = SurityInterface(_msgSender());
    }

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

    function setRewardRate(uint256 rewardRate_) external onlyOwner {
        _rewardRate = rewardRate_;
        emit RewardRateUpdated(rewardRate_);
    }

    function rewardPerStake() public view returns (uint256) {
        if (_totalStaked == 0) {
            return _rewardPerTokenStored;
        }

        uint256 elapsedStakedTime = block.timestamp - _lastUpdateTime;
        uint256 totalRewards = _rewardRate * elapsedStakedTime;

        return totalRewards / _totalStaked;
    }

    function earned(address account_) public view returns (uint256) {
        return
            _stakedBalance[account_] *
            (rewardPerStake() - _userRewardsPerTokenPaid[account_]);
    }

    function claimRewards() external nonReentrant updateReward(_msgSender()) {
        uint256 reward = _rewards[_msgSender()];
        require(reward > 0, "No rewards to claim");
        _rewards[_msgSender()] = 0;

        _mint(_msgSender(), reward);

        emit RewardsClaimed(_msgSender(), reward);
    }

    function totalStake() public view returns (uint256) {
        return _totalStaked;
    }

    function liquidity() public view returns (uint256) {
        return _interface.usdToken().balanceOf(address(this));
    }

    function acknowledgeStake(
        address account_,
        uint256 amount_,
        address controllerAddress_
    ) external onlyOwner nonReentrant {
        require(amount_ > 0, "Invalid stake amount");
        _totalStaked += amount_;
        _stakedBalance[account_] += amount_;

        emit Staked(account_, controllerAddress_, amount_);
    }

    function acknowledgeRevoke(
        address account_,
        uint256 amount_,
        address controllerAddress_
    ) external onlyOwner nonReentrant {
        require(amount_ > 0, "Invalid revoke Amount");
        _totalStaked -= amount_;
        _stakedBalance[account_] -= amount_;

        emit Revoked(account_, controllerAddress_, amount_);
    }

    function tokenPrice() public view returns (uint256) {
        return _displayPrice;
    }

    function marketCap() public view returns (uint256) {
        return ((_displayPrice * totalSupply()) / (10 * decimals()));
    }

    function calculateTokensReceived(
        uint256 amount_
    ) public view returns (uint256) {
        return (totalSupply() * amount_) / (liquidity() + amount_);
    }

    function calculateSellRefund(
        uint256 amount_
    ) public view returns (uint256) {
        return (liquidity() * amount_) / (totalSupply() + amount_);
    }

    function calculateBuyCost(uint256 amount_) public view returns (uint256) {
        require(totalSupply() >= amount_, "Insufficient Supply");
        return (liquidity() * amount_) / (totalSupply() - amount_);
    }

    function buy(
        uint256 amountIn_,
        uint256 amountOutMin_
    ) external nonReentrant {
        uint256 amountOutCalculated = calculateTokensReceived(amountIn_);

        require(
            amountOutCalculated > amountOutMin_,
            "Slippage Tolerance Exceeded"
        );

        _interface.usdToken().transferFrom(
            _msgSender(),
            address(this),
            amountIn_
        );
        _mint(_msgSender(), amountOutCalculated);

        emit Buy(_msgSender(), amountOutCalculated, amountIn_);

        _displayPrice = calculateBuyCost(10 ** (decimals()));
    }

    function sell(
        uint256 amountIn_,
        uint256 amountOutMin_
    ) external nonReentrant {
        uint256 refundCalculated = calculateSellRefund(amountIn_);

        require(
            refundCalculated > amountOutMin_,
            "Slippage Tolerance Exceeded"
        );

        _burn(_msgSender(), amountIn_);
        _interface.usdToken().transfer(msg.sender, refundCalculated);

        emit Sell(_msgSender(), amountIn_, refundCalculated);
    }
}
