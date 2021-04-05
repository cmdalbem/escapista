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
import thumbviario from './assets/thumb-viario.png';
import thumbprowalk from './assets/thumb-prowalk.png';
import thumbrambalac from './assets/thumb-rambalac.png';
import thumbthesilentwatcher from './assets/thumb-thesilentwatcher.png';
import thumbthevagabondgenefamily from './assets/thumb-thevagabondgenefamily.png';
import thumbchillandexplore from './assets/thumb-chillandexplore.png';
import thumbwanderlust from './assets/thumb-wanderlust.png';
import thumbwanderingthomas from './assets/thumb-wanderingthomas.png';
import thumbdutchman from './assets/thumb-dutchman.png';
import thumbnippon from './assets/thumb-nippon.png';
import thumbrailcowgirl from './assets/thumb-railcowgirl.png';

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
            <div className="pt-4 sm:pt-16 pl-4 sm:pl-16 w-screen h-screen flex flex-col items-start justify-between relative">
                <div
                    className={`absolute bottom-0 right-0 h-screen transition-opacity duration-1000 delay-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
                    style={{
                        left: '-10%',
                        width: isMobile && '170vh',
                        transform: isMobile && 'translate(-46%, 15%)'
                }}>
                    <Art />
                </div>

                <div className={`${slideIn} flex flex-auto flex-col`}>
                    <div className="flex items-center">
                        <img src={logoMini} className="mr-3"></img>
                        <h1 className={logoTypography}>
                            Escapista
                        </h1>
                    </div>

                    <div className="flex flex-col flex-auto mt-24">
                        <div className={slideIn}>
                            <h2 className="max-w-lg sm:max-w-5xl font-heading font-regular whitespace-pre-line text-4xl sm:text-6xl leading-tight">
                                { t('welcome-title') }
                            </h2>

                            <div className={`mt-10 delay-200`}>
                                <Button
                                    primary
                                    label={ t('welcome-cta') }
                                    onClick={onStartClick}
                                ></Button>

                                <Button
                                    label={ t('read-more') }
                                    onClick={() => document.querySelector('#scrollTo').scrollIntoView({ behavior: 'smooth' })}
                                ></Button>
                            </div>
                        </div>
                    
                    </div>
                    
                    {/* <div className="w-screen flex justify-end pr-32">
                        <ProductHuntBadge/>
                    </div> */}
                </div>
            </div>
            
            <div id="scrollTo" className="w-full sm:h-screen flex-col sm:flex-row flex justify-between items-center relative">
                <LandingHeading
                    _className="sm:w-6/12 px-4 sm:ml-16"
                    title={ t('welcome-heading1') }
                    body={ t('welcome-body1') }
                />

                <img className="sm:w-6/12 z-10" src={comp1}></img>

                <BackgroundBlurryGlows/>
            </div>

            <div className="sm:pr-16 w-full sm:h-screen flex flex-col sm:flex-row justify-end items-center relative">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-none -mx-4">
                    <Thumb name="Prowalk Tours" img={thumbprowalk}
                        x="10%" y="0%"
                    ></Thumb>

                    <Thumb name="City Walks" img={thumbcitywalks}
                        x="35%" y="10%"
                    ></Thumb>

                    <Thumb name="J Utah" img={thumbjutah}
                        x="5%" y="30%"
                    ></Thumb>

                    <Thumb name="Via Rio" img={thumbviario}
                        x="30%" y="40%"
                    ></Thumb>

                    <Thumb name="Wanna Walk" img={thumbwannawalk}
                        x="1%" y="65%"
                    ></Thumb>

                    <Thumb name="RailCowGirl" img={thumbrailcowgirl}
                        x="40%" y="70%"
                    ></Thumb>
                </div>

                <LandingHeading
                    _className={`px-4 sm:w-4/12`}
                    title={ t('welcome-heading2') }
                    body={ t('welcome-body2') }
                />
            </div>

            <div className="w-full sm:h-screen flex flex-col sm:flex-row justify-start items-center relative">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-none -mx-4">
                    <Thumb name="Rambalac" img={thumbrambalac}
                        x="35%" y="0%"
                    ></Thumb>

                    <Thumb name="TheSilentWatcher" img={thumbthesilentwatcher}
                        x="5%" y="0%"
                    ></Thumb>

                    <Thumb name="The Vagabond Gene Family" img={thumbthevagabondgenefamily}
                        x="45%" y="30%"
                    ></Thumb>

                    <Thumb name="Chill & Explore" img={thumbchillandexplore}
                        x="75%" y="20%"
                    ></Thumb>

                    <Thumb name="Wanderlust Travel Videos" img={thumbwanderlust}
                        x="48%" y="60%"
                    ></Thumb>

                    <Thumb name="Wandering Thomas" img={thumbwanderingthomas}
                        x="85%" y="55%"
                    ></Thumb>
                    
                    <Thumb name="The Flying Dutchman" img={thumbdutchman}
                        x="30%" y="90%"
                    ></Thumb>
                    
                    <Thumb name="Nippon Wandering TV" img={thumbnippon}
                        x="70%" y="85%"
                    ></Thumb>
                </div>

                <LandingHeading
                    _className={`px-4 sm:ml-16`}
                    title={ t('welcome-heading3') }
                    body={ t('welcome-body3') }
                />

                <BackgroundBlurryGlows/>
            </div>

            <div className="w-full hidden sm:flex justify-center mt-64" style={{height: 300}}>
                <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-around items-center">
                    <BigNum
                        value="7"
                        label={ t('welcome-bignum1') }
                    ></BigNum>
                    <BigNum
                        value="76"
                        label={ t('welcome-bignum2') }
                    ></BigNum>
                    <BigNum
                        value="552"
                        label={ t('welcome-bignum3') }
                    ></BigNum>
                    <BigNum
                        value="781"
                        label={ t('welcome-bignum4') }
                    ></BigNum>
                </div>
            </div>

            <div className="w-full sm:h-screen flex flex-col sm:flex-row justify-between items-center mt-32 pr-4 sm:pr-16">
                <img className="object-contain sm:w-8/12" src={comp2}></img>

                <LandingHeading
                    _className="mx-4 sm:w-4/12"
                    title={ t('welcome-heading4') }
                    body={ t('welcome-body4') }
                />
            </div>

            <div className="w-full h-screen flex flex-col justify-center items-start relative pl-4 sm:pl-16 overflow-hidden">
                <h2 className={`${slideIn} max-w-xl font-heading font-regular whitespace-pre-line text-6xl leading-tight`}>
                    { t('welcome-final') }
                </h2>

                <div className={`mt-8 ${slideIn} delay-200`}>
                    <Button
                        primary
                        label={ t('welcome-cta') }
                        onClick={onStartClick}
                    ></Button>

                    <a
                        href={manifestoUrl}
                        className="py-4 px-8 ml-4 rounded font-bold hover:text-teal-600 duration-300 bg-white sm:bg-transparent"
                        target="_blank" rel="noopener noreferrer"
                    >
                        { t('read-the-manifesto') }
                    </a>
                </div>

                <BlurryGlows/>
            </div>

            <div style={{height: 700}} className="w-full flex flex-col justify-center items-center text-white bg-teal-700">
                <div>
                    { t('footer') }
                </div>

                <img className="mt-8" src={logo}></img>
            </div>
        </div>
    );
}

function BigNum({value, label}) {
    return (
        <div className="flex flex-col justify-center text-center mt-8 sm:mt-0">
            <div 
                className="font-heading leading-tight" 
                style={{fontSize: isMobile ? 72 : 128}
            }>
                { value }
            </div>
            <div className="text-regular capitalize">
                { label }
            </div>
        </div>
    );
}

function Button({label, onClick, primary}) {
    let classes = 'py-4 px-8 mr-4 rounded font-bold duration-200 ';

    if (primary) {
        classes += 'bg-teal-800 text-white hover:bg-teal-600 '
    } else {
        classes += 'hover:bg-white font-bold bg-white sm:bg-transparent'
    }

    return (
        <button
            className={classes}
            style={{minWidth: 160}}
            onClick={onClick}>
            { label }
        </button>
    )
}

function LandingHeading({title, body, _className}) {
    // className={`sm:max-w-lg text-teal-800 ${_className} ${isMobile && '-my-20 py-20 z-20'}`}
    //         style={{
    //             background: isMobile && 'linear-gradient(transparent, #f7f1ee 15%, #f7f1ee 85%, transparent)'
    //         }}

    return (
        <div 
            className={`sm:max-w-lg text-teal-800 ${_className} py-8 sm:py-0`}
        >
            <div className="font-heading whitespace-pre-line font-bold text-2xl sm:text-4xl leading-tight mb-2 sm:mb-4">
                { title }
            </div>
            <div className="text-md sm:text-lg">
                { body }
            </div>
        </div>
    );
}

function Thumb({img, name, url, x, y}) {
    return (
        <div
            className="flex flex-col sm:absolute sm:opacity-75 hover:opacity-100 transition-opacity duration-500"
            style={{width: isMobile ? '' : '20vw', top: y, left: x}
        }>
            <img src={img}></img>
            <div className="text-xs sm:mt-1 hidden sm:block">
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
            <div className="absolute rounded-full opacity-25 sm:opacity-100" style={{
                background: '#FEFCBF',
                top: '20%',
                left: '55%',
                width: 700, height: 700,
                filter: `blur(100px)`,
            }}></div>
            <div className="absolute rounded-full opacity-0 sm:opacity-100" style={{
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