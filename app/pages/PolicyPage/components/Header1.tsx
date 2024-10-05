import React from 'react'
import { Policy } from '../../../types'
import useApiResponse from '../../../hooks/useApiResponse';
import api from '../../../utils/api';
import marketer from '../../../utils/api/marketer';
import { formatEvmAddress } from '../../../utils';

export default function Header1(props: { policy: Policy }) {

    const { policy } = props;
    const { data: user } = useApiResponse(api.user.get, policy.creator);

    return (
        <div className='w-full bg-foreground/50 rounded-md flex px-6 gap-x-8 py-4 justify-between'>
            <div className='w-1/3 h-[20vh] flex items-center justify-center rounded-md relative'>
                <img
                    src={policy.image}
                    className='h-full object-cover w-full rounded-md'
                    alt="Policy"
                />
            </div>
            <div className='w-2/3 flex flex-col'>
                <h1 className='text-3xl font-bold tracking-wider truncate whitespace-nowrap'>Gettie Car Insure</h1>
                <p>Category: {policy.category}</p>
                <p className='text-sm text-front/60'>
                    {`${"nftcar allows you to invest in NFT Cars and the cars yield you returns and a dividend. MERN stack with typescript was used, talwindCSS was used as a CSS library and Prism was used as an ORM. Solidity was used for smart contracts and the NFTS are ERC-1155 tokens to allow multiple owners"
                        .slice(0, 150)}${"nftcar allows you to invest in NFT Cars and the cars yield you returns and a dividend. MERN stack with typescript was used, talwindCSS was used as a CSS library and Prism was used as an ORM. Solidity was used for smart contracts and the NFTS are ERC-1155 tokens to allow multiple owners".length > 150 ? '...' : ''}`}
                </p>

                <div className='flex gap-x-4 mt-4'>
                    <img src={user?.marketer?.image} className='w-[4vw] rounded-full h-[4vw] aspect-square object-cover' />
                    <div className='text-sm flex flex-col gap-y-1'>
                        <p>Marketer: {user?.marketer?.name}</p>
                        <p className='text-xs'>

                            {user && formatEvmAddress(user?.address)}
                        </p>
                    </div>
                </div>
                <div className='flex gap-x-4 self-end mt-3'>
                    <button className='bg-front text-back px-4 rounded-2xl py-1 font-semibold'>Buy Policy</button>
                    <button className='bg-secondary text-front px-6 rounded-2xl py-1 font-semibold'>Stake</button>
                </div>
            </div>
        </div>
    )
}
