import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { Popular } from '../Components/Popular/Popular'
import { Offers } from '../Components/Offers/Offers'
import { NewCollections } from '../Components/NewCollections/NewCollections'
import { NewsLetter } from '../Components/NewsLetter/NewsLetter'


export const Shop = () => {

    const scrollToNewCollections = () => {
        // Scroll to the NewCollections component
        const newCollectionsElement = document.getElementById('newCollections');
        if (newCollectionsElement) {
            newCollectionsElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Hero scrollToNewCollections={scrollToNewCollections} />
            <Popular />
            <Offers />
            <NewCollections />
            <NewsLetter />
        </div>
    )
}
