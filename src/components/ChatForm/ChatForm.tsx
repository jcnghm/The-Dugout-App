import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, choosePosition, chooseLeague, chooseRating, chooseTeam } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

import { useGetData } from '../../custom-hooks';

interface HeroFormProps {
    id?:string;
    data?:{}
}

interface HeroState {
    name: string;
    team: string;
    league: string;
    position: string;
    rating: string;
}

export const ChatForm = (props:HeroFormProps) => {

    const dispatch = useDispatch();
    let { heroData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<HeroState>(state => state.name)
    const team = useSelector<HeroState>(state => state.team)
    const league = useSelector<HeroState>(state => state.league)
    const position = useSelector<HeroState>(state => state.position)
    const rating = useSelector<HeroState>(state => state.rating)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseTeam(data.team))
            dispatch(chooseLeague(data.league))
            dispatch(choosePosition(data.position))
            dispatch(chooseRating(data.rating))

            await server_calls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="team">Team</label>
                    <Input {...register('team')} name="team" placeholder="Team"/>
                </div>
                <div>
                    <label htmlFor="league">League</label>
                    <Input {...register('league')} name="league" placeholder="League"/>
                </div>
                <div>
                    <label htmlFor="position">Position</label>
                    <Input {...register('position')} name="position" placeholder="Position"/>
                </div>
                <div>
                    <label htmlFor="rating">Rating</label>
                    <Input {...register('rating')} name="rating" placeholder="Rating"/>
                </div>
                <Button type='submit' color='primary' variant='contained'>Submit</Button>
            </form>
        </div>
    )
}