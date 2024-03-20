import { useLocation, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents } from '../redux/eventsSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    max-width: 800px;
    padding: 20px;
    margin: 0 auto;
`


const BackButton = styled.button`
    margin-left: 20px;
    margin-right: 20px; 

    font-size: 16px;
    background-color: transparent;
    border: none;
    cursor: pointer;

    // Transition animation sourced from https://www.w3schools.com/css/css3_transitions.asp
    transition: color 0.3s ease;
    &:hover {
        color: #f15454;
    }
`

const EventImage = styled.img`
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
`;

const Name = styled.h1`
    font-size: 40px;
    margin-bottom: 10px;
`;

const Location = styled.p`
    font-size: 20px;
    color: #666;
`;

const Details = styled.div`
    margin-bottom: 20px;
`;

const DetailItem = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
`;

const RSVPButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #f15454;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #d94343;
    }
`;

const FlexBox = styled.div`
    display: flex;  // Initializes the flex container (so it can be used)
    flex-direction: row;
    width: 100vw;  // viewport width
    justify-content: center;
`

const FlexBox2 = styled.div`
    width: 30%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    margin-right: 20px;
`

const FlexBox3 = styled.div`
    width: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const DetailIcon = styled.img`
    width: 20px;
    height: 20px;
`

export default function Event() {
    const params = useParams()


    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

    const event = events.filter(event => event.id === params.eventID)
    console.log("==event[params.eventID]: ", events[params.eventID])
    // console.log("==events: ", events)
    // console.log("==params.eventID: ", params.eventID)
    // events.map(event => console.log(event.id))

    return (        
        <>
            <NavLink to="/search">
                <BackButton>
                    <FontAwesomeIcon icon={faArrowLeft} size="3x"></FontAwesomeIcon>
                </BackButton>
            </NavLink>
            
            <FlexBox>
                <FlexBox2>
                    <EventImage src="/osu.jpg" alt="Event Image"></EventImage>
                </FlexBox2>

                <FlexBox3>
                    <Name>{event.name}</Name>
                    <Details>
                       <DetailItem>
                            <DetailIcon src="/calendar.png" alt="calendar"></DetailIcon>
                            &nbsp;{event.date}
                       </DetailItem>

                        <Location>
                            <DetailIcon src="/map-pin.png" alt="pin"></DetailIcon>
                            &nbsp;{event.location}
                        </Location>

                        <DetailItem>
                            <DetailIcon src="/clock.webp" alt="clock"></DetailIcon>
                            &nbsp;{event.time}
                        </DetailItem>

                    </Details>
                </FlexBox3>
            </FlexBox>

           
        </>
    )
}