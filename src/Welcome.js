import React, { useEffect, useState } from "react";

import { withTranslation } from 'react-i18next';

import {
    isMobile
  } from "react-device-detect";

import Art from './Art.js'
import ProductHuntBadge from './ProductHuntBadge.js'

import logo from './assets/logo-dark.svg';
import logoMini from './assets/logo-mini.svg';

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
import thumbdutchman from './assets/thumb-dutchman.png';
import thumbnippon from './assets/thumb-nippon.png';

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
        <div className="relative font-body overflow-hidden"
            style={{
                color: '#006E6E',
                backgroundColor: '#F6F5F2'}}
        >
            <div className={`absolute top-0 right-0 transition-opacity duration-1000 delay-500 ${loading ? 'opacity-0' : 'opacity-100'}`} style={{left: '-10%'}}>
                <Art />
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
                        <div className={slideIn}>
                            <h2 className="max-w-5xl font-heading font-regular whitespace-pre-line text-6xl leading-tight">
                                { t('welcome-heading') }
                            </h2>

                            <div className={`mt-10 delay-200`}>
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
                    
                    </div>
                    
                    {/* <div className="w-screen flex justify-end pr-32">
                        <ProductHuntBadge/>
                    </div> */}
                </div>
            </div>
            
            <div className="w-full h-screen flex justify-between items-center relative">
                <div className="w-6/12 ml-16">
                    <LandingHeading
                        title="Choose a channel and let your mind wander with the continous stream of content"
                        body="It's television at the speed of life. And, as in life, it doesn't come with pause or skips buttons. It's the ultimate minimalistic, relaxing experience."
                    />
                </div>

                <img className="w-6/12 z-10" src={comp1}></img>

                <BackgroundBlurryGlows/>
            </div>

            <div className="pr-16 w-full h-screen flex justify-end items-center relative">
                <Thumb name="Prowalk Tours" img={thumbprowalk}
                    x="10%" y="0%"
                ></Thumb>

                <Thumb name="City Walks" img={thumbcitywalks}
                    x="40%" y="15%"
                ></Thumb>

                <Thumb name="J Utah" img={thumbjutah}
                    x="5%" y="35%"
                ></Thumb>

                <Thumb name="Bike the World" img={thumbbiketheworld}
                    x="30%" y="45%"
                ></Thumb>

                <Thumb name="Wanna Walk" img={thumbwannawalk}
                    x="10%" y="70%"
                ></Thumb>

                <LandingHeading
                    _className="w-4/12"
                    title="A selection of videos from the best creators and stunning places around the world"
                    body="It's built on top of a simple YouTube Player, so all views and ad revenue goes to the original creators - the real artists here :)"
                />
            </div>

            <div className="w-full h-screen flex justify-start items-center relative">
                <Thumb name="Rambalac" img={thumbrambalac}
                    x="35%" y="0%"
                ></Thumb>

                <Thumb name="TheSilentWatcher" img={thumbthesilentwatcher}
                    x="1%" y="0%"
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
                
                <Thumb name="The Flying Dutchman" img={thumbdutchman}
                    x="30%" y="90%"
                ></Thumb>
                
                <Thumb name="Nippon Wandering TV" img={thumbnippon}
                    x="70%" y="85%"
                ></Thumb>

                <LandingHeading
                    _className="ml-16"
                    title="Watch hundreds of hours of Slow TV content, dearly curated by human beings"
                    body="We swept the World Wide Web to collect only the best adventures. For each video selected, ten other weren't."
                />

                <BackgroundBlurryGlows/>
            </div>

            <div className="w-full h-screen flex justify-center mt-64" style={{height: 300}}>
                <div className="w-full max-w-6xl flex justify-around items-center">
                    <BigNum
                        value="100+"
                        label="creators"
                    ></BigNum>
                    <BigNum
                        value="500+"
                        label="hours of content"
                    ></BigNum>
                    <BigNum
                        value="600+"
                        label="curated videos"
                    ></BigNum>
                    <BigNum
                        value="2400+"
                        label="logged videos"
                    ></BigNum>
                </div>
            </div>

            <div className="w-full h-screen flex justify-between items-center mt-32 pr-16">
                <img className="object-contain w-8/12" src={comp2}></img>

                <LandingHeading
                    _className="w-4/12"
                    title="Enjoy it while you work, put on your TV or invite a friend for a remote stroll"
                    body="Videos are always in sync, so just share the link with someone you want to watch together and you're good to go."
                />
            </div>

            <div className="w-full h-screen flex flex-col justify-center items-start relative overflow-hidden pl-16">
                <h2 className="max-w-xl font-heading font-regular whitespace-pre-line text-6xl leading-tight">
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
                        className="py-3 px-6 ml-4 rounded font-medium hover:text-teal-600 duration-300"
                        target="_blank" rel="noopener noreferrer"
                    >
                        { t('read-the-manifesto') }
                    </a>
                </div>

                <BlurryGlows/>
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

function BigNum({value, label}) {
    return (
        <div className="flex flex-col justify-center text-center">
            <div className="font-heading leading-tight" style={{fontSize: 72}}>
                { value }
            </div>
            <div className="text-regular mt-0">
                { label }
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
            <div className="text-lg">
                { body }
            </div>
        </div>
    );
}

function Thumb({img, name, url, x, y}) {
    return (
        <div className="flex flex-col absolute" style={{width: '20vw', top: y, left: x}}>
            <img src={img}></img>
            <div className="text-xs mt-1">
                { name }
            </div>
        </div>
    );
}

function BackgroundBlurryGlows() {
    return (
        <div className="bgblur absolute top-0 pointer-events-none">
            <div
                className="absolute opacity-25"
                style={{
                    filter: `blur(500px)`,
                    mixBlendMode: 'darken'
            }}>
                <div className="absolute rounded-full" style={{
                    background: '#ead8ae',
                    top: 0,
                    left: '50%',
                    width: 800, height: 800
                }}></div>
                <div className="absolute rounded-full" style={{
                    background: '#FEB2B2',
                    top: '100%',
                    left: '10%',
                    width: 800, height: 800
                }}></div>
                <div className="absolute rounded-full" style={{
                    background: '#FFC0B2',
                    top: '150%',
                    left: '50%',
                    width: 800, height: 800
                }}></div>
                {/* <div className="absolute rounded-full" style={{
                    background: '#006E6E',
                    top: '150%',
                    left: '10%',
                    width: 800, height: 800
                }}></div> */}
            </div>

            <div
                className="absolute w-screen h-screen z-20 opacity-25"
                style={{
                    filter: `blur(200px)`,
                    mixBlendMode: 'overlay'
            }}>
                <div className="absolute rounded-full" style={{
                    background: '#C39934',
                    top: 0,
                    left: '50%',
                    width: 800, height: 800
                }}></div>
                <div className="absolute rounded-full" style={{
                    background: '#FEB2B2',
                    top: '100%',
                    left: '10%',
                    width: 800, height: 800
                }}></div>
                <div className="absolute rounded-full" style={{
                    background: '#FF8062',
                    top: '120%',
                    left: '50%',
                    width: 800, height: 800
                }}></div>
            </div>
        </div>
    )
}

function BlurryGlows() {
    return (<>
        <div className="absolute w-screen h-screen top-0 pointer-events-none">
            <div className="absolute rounded-full" style={{
                background: '#FEFCBF',
                top: '20%',
                left: '55%',
                width: 700, height: 700,
                filter: `blur(100px)`,
            }}></div>
            <div className="absolute rounded-full" style={{
                background: '#FF8062',
                top: '30%',
                left: '50%',
                width: 400, height: 400,
                filter: `blur(100px)`
            }}></div>
            <div className="absolute rounded-full" style={{
                background: '#FF8062',
                top: '30%',
                left: '50%',
                width: 400, height: 400,
                filter: `blur(50px)`,
                mixBlendMode: 'overlay'
            }}></div>
            <div className="absolute rounded-full" style={{
                background: '#FF8062',
                top: '30%',
                left: '30%',
                width: 400, height: 400,
                filter: `blur(100px)`,
                mixBlendMode: 'lighten'
            }}></div>
        </div>
    </>)
}

export default withTranslation()(Welcome);