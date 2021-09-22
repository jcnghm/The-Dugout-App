import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents'
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

import { useGetData } from '../../custom-hooks';

interface PlayerFormProps {
    id?:string;
    data?:{}
}

interface PlayerState {
    name: string;
    price: string;
}

export const AddPlayer = (props:PlayerFormProps) => {

    const dispatch = useDispatch();
    let { playerData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<PlayerState>(state => state.name)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            server_calls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Drone Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="price">Team</label>
                    <Input {...register('price')} name="price" placeholder="Price"/>
                </div>

                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}