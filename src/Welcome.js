import React, { useEffect, useState } from "react";

import { withTranslation } from 'react-i18next';

import {
    isMobile
  } from "react-device-detect";

import Art from './Art.js'
import ProductHuntBadge from './ProductHuntBadge.js'

import logo from './assets/logo-dark.png';
import logoMini from './assets/logo-mini.png';

import comp1 from './assets/comp1.png';
import comp2 from './assets/comp2.png';
import thumbcitywalks from './assets/thumb-citywalks.png';
import thumbjutah from './assets/thumb-jutah.png';
import thumbwannawalk from './assets/thumb-wannawalk.png';
import thumbbiketheworld from './assets/thumb-biketheworld.png';
import thumbprowalk from './assets/thumb-prowalk.png';
import thumbrambalac from './assets/thumb-rambalac.png';
import thumbthesilentwatcher from './assets/thumb-thesilentwatcher.png';
import thumbthevagabondgenefamily from './assets/thumb-thevagabondgenefamily.png';
import thumbchillandexplore from './assets/thumb-chillandexplore.png';
import thumbwanderlust from './assets/thumb-wanderlust.png';
import thumbwanderingthomas from './assets/thumb-wanderingthomas.png';
import thumbwrambalac2 from './assets/thumb-rambalac2.png';
import thumbw4krelaxationchannel from './assets/thumb-4krelaxationchannel.png';

import {
    ESCAPIST_EASING_BEZIER,
    ESCAPIST_EASING_TIMING,
    MANIFESTO_URLS
} from './constants.js';


function Welcome(props) {
    const { t, i18n } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setTimeout(() => setLoading(false), 1000);
        setLoading(false);
    }, []);

    function onStartClick() {
        setLoading(true);
        setTimeout(props.onStartClick, 2000);
    }

    const lang = i18n.language.split('-')[0];
    const manifestoUrl = MANIFESTO_URLS[lang];

    const logoTypography = 'text-lg font-logo tracking-widest uppercase font-bold';

    const slideIn = `
        transition-all transform duration-1000 ease-in-out
        ${loading ? '-translate-y-3 opacity-0' : '-translate-y-0 opacity-100'}`;

    return (
        <div
            className="relative font-body"
            style={{
                color: '#006E6E',
                backgroundColor: '#F6F5F2'}}
        >
            <div className="absolute left-0 top-0">
                <div
                    className="w-screen h-screen"
                    style={{
                        transition: `transform ${ESCAPIST_EASING_TIMING} ${ESCAPIST_EASING_BEZIER}`,
                        // transform: `translate(${MAIN_BAR_WIDTH}px, -${BOTTOM_BAR_HEIGHT}px)`,
                        // paddingRight: MAIN_BAR_WIDTH,
                        // paddingTop: BOTTOM_BAR_HEIGHT
                    }}>
                    <div className={`absolute top-0 left-0 right-0 transition-opacity duration-1000 delay-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                        <Art />
                    </div>
                </div>
            </div>

            <div className="pt-16 pl-16 w-screen h-screen flex flex-col items-start justify-between">
                <div className={`${slideIn} flex flex-auto flex-col`}>
                    <div className="flex items-center">
                        <img src={logoMini} className="mr-3"></img>
                        <h1 className={logoTypography}>
                            Escapista
                        </h1>
                    </div>

                    <div className="flex flex-col flex-auto mt-24">
                        <div>
                            <h2 className="max-w-6xl font-heading font-regular whitespace-pre-line text-6xl leading-tight">
                                { t('welcome-heading') }
                            </h2>

                            <div className={`mt-10 ${slideIn} delay-200`}>
                                <Button
                                    primary
                                    label={ t('welcome-cta') }
                                    onClick={onStartClick}
                                ></Button>

                                <Button
                                    label="Read more"
                                    onClick={onStartClick}
                                ></Button>
                            </div>
                        </div>
                        
                        {/* {
                            !isMobile && 
                            <ProductHuntBadge/>
                        } */}
                    </div>
                </div>
            </div>

            <div className="w-full pl-16 h-screen flex justify-between items-center">
                <div className=" flex justify-center">
                    <LandingHeading
                        title="Choose a channel and let your mind wander with the continous stream of content"
                        body="It's television at the speed of life. And, as in life, it doesn't come with pause or skips buttons. It's the ultimate minimalistic, relaxing experience."
                    />
                </div>

                <img className="object-contain h-full  z-10" src={comp1}></img>
            </div>

            <div className="pr-16 w-full h-screen flex justify-end items-center relative">
                <Thumb name="Prowalk Tours" img={thumbprowalk}
                    x="10%" y="0%"
                ></Thumb>

                <Thumb name="City Walks" img={thumbcitywalks}
                    x="40%" y="20%"
                ></Thumb>

                <Thumb name="J Utah" img={thumbjutah}
                    x="5%" y="35%"
                ></Thumb>

                <Thumb name="Bike the World" img={thumbbiketheworld}
                    x="30%" y="50%"
                ></Thumb>

                <Thumb name="Wanna Walk" img={thumbwannawalk}
                    x="10%" y="75%"
                ></Thumb>

                <LandingHeading
                    title="A selection of videos from the best creators and stunning places around the world"
                    body="It's built on top of a simple YouTube Player, so all views and ad revenue goes to the original creators - the real artists here :)"
                />
            </div>

            <div className="w-full h-screen flex justify-start items-center relative">
                <Thumb name="Rambalac" img={thumbrambalac}
                    x="40%" y="0%"
                ></Thumb>

                <Thumb name="TheSilentWatcher" img={thumbthesilentwatcher}
                    x="1%" y="5%"
                ></Thumb>

                <Thumb name="The Vagabond Gene Family" img={thumbthevagabondgenefamily}
                    x="45%" y="30%"
                ></Thumb>

                <Thumb name="Chill & Explore" img={thumbchillandexplore}
                    x="75%" y="20%"
                ></Thumb>

                <Thumb name="Wanderlust Travel Videos" img={thumbwanderlust}
                    x="50%" y="60%"
                ></Thumb>

                <Thumb name="Wandering Thomas" img={thumbwanderingthomas}
                    x="80%" y="55%"
                ></Thumb>
                
                <Thumb name="Rambalac" img={thumbwrambalac2}
                    x="30%" y="90%"
                ></Thumb>
                
                <Thumb name="4k Relaxation Channel" img={thumbw4krelaxationchannel}
                    x="70%" y="85%"
                ></Thumb>

                <LandingHeading
                    _className="ml-16"
                    title="Watch hundreds of hours of Slow TV content dearly curated by human beings"
                    body="We swept the World Wide Web to collect only the best adventures. For each video selected, ten other weren't."
                />
            </div>

            <div className="w-full h-screen flex justify-between items-center mt-64 pr-16">
                <img className="object-contain h-full " src={comp2}></img>

                <div className=" flex justify-center">
                    <LandingHeading
                        title="Enjoy it while you work, put on your TV or invite a friend for a remote stroll"
                        body="Videos are always in sync, so just share the link with someone you want to watch together and you're good to go."
                    />
                </div>
            </div>

            <div className="w-full h-screen flex flex-col justify-center items-center">
                <h2 className="max-w-2xl text-center font-heading font-regular whitespace-pre-line text-6xl leading-tight">
                    Where do you want to escape to?
                </h2>

                <div className={`mt-8 ${slideIn} delay-200`}>
                    <Button
                        primary
                        label={ t('welcome-cta') }
                        onClick={onStartClick}
                    ></Button>

                    <a
                        href={manifestoUrl}
                        className="py-3 px-6 ml-4 rounded font-medium hover:bg-white duration-300"
                        target="_blank" rel="noopener noreferrer"
                    >
                        { t('read-the-manifesto') }
                    </a>
                </div>
            </div>

            <div style={{height: 700}} className="w-full flex flex-col justify-center items-center text-white bg-teal-700">
                <div>
                    If you can, stay home. Save lives.
                </div>

                <img className="mt-8" src={logo}></img>
            </div>
        </div>
    );
}

function Button({label, onClick, primary}) {
    let classes = 'py-4 px-8 rounded font-medium duration-300 ';

    if (primary) {
        classes += 'bg-teal-800 text-white hover:bg-teal-600 '
    } else {
        classes += 'hover:bg-white'
    }

    return (
        <button
            className={classes}
            style={{minWidth: 140}}
            onClick={onClick}>
            { label }
        </button>
    )
}

function LandingHeading({title, body, _className}) {
    return (
        <div className={`max-w-lg text-teal-800 ${_className}`}>
            <div className="font-heading whitespace-pre-line font-bold text-4xl leading-tight mb-4">
                { title }
            </div>
            <div className="text-lg max-w-sm">
                { body }
            </div>
        </div>
    );
}

function Thumb({img, name, url, x, y}) {
    return (
        <div className="flex flex-col absolute" style={{width: 330}}
            style={{top: y, left: x}}>
            <div>
                <img src={img}></img>
            </div>
            <div className="text-xs mt-1">
                { name }
            </div>
        </div>
    );
}

export default withTranslation()(Welcome);