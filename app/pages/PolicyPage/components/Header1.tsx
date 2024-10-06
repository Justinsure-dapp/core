import React from "react";
import { Policy } from "../../../types";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import marketer from "../../../utils/api/marketer";
import { formatEvmAddress } from "../../../utils";
import { Link } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import StakeModal from "./StakeModal";

export default function Header1({ policy }: { policy: Policy }) {
  const { data: user } = useApiResponse(api.user.get, policy.creator);
  const modal = useModal();

    return (
        <div className="flex flex-col gap-1">
            <div className='w-full bg-foreground/50 gap-4 rounded-md flex px-6 py-4'>
                <div className="max-w-[10rem] w-full">
                    <img
                        src={policy.image}
                        className='border border-border rounded-md'
                        alt="Policy"
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <h1 className='text-3xl font-bold tracking-wider truncate whitespace-nowrap'>{policy.name}</h1>
                    <p>Category: {policy.category}</p>
                    <p className='text-sm text-front/60'>
                        {`${policy.description.slice(0, 150)}${policy.description.length > 150 ? '...' : ''}`}
                    </p>

                    <div className='flex gap-x-4 mt-4'>
                        <img src={user?.marketer?.image} className='w-12 shadow-sm rounded-full aspect-square object-cover' />
                        <div className='text-sm flex flex-col gap-y-1'>
                            <p>Marketer: {user?.marketer?.name}</p>
                            <p className='text-xs'>

                                {user && formatEvmAddress(user?.address)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex gap-x-4 self-end mt-3'>
                <Link to={`/buy-policy/${policy.address}`} className='bg-front hover:bg-front/80 transition-all text-back px-4 rounded-2xl border border-border py-1 font-semibold'>Buy Policy</Link>
                <button className='bg-primary border border-border hover:bg-primary/80 transition-all text-front px-6 rounded-2xl py-1 font-semibold' onClick={() => {
                    modal.show(<StakeModal policy={policy} />);
                }}>Stake</button>
            </div>
        </div>
    )
}
