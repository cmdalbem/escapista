import { isMobile } from "react-device-detect";

export const MAIN_BAR_WIDTH = isMobile ? 192 : 384;
export const BOTTOM_BAR_HEIGHT = isMobile ? 96 : 180;
export const BOTTOM_BAR_AUTOCLOSE_TIMEOUT_MS = 3000;

export const ESCAPIST_EASING_BEZIER = 'cubic-bezier(0.65, 0, 0.35, 1)';
export const ESCAPIST_EASING_TIMING = '1.2s';

export const LIVENESS_CHECK_MS = 1000;

export const VIDEO_TRANSITION_MS = 1000;
export const LABELS_TRANSITION_MS = 1000;

export const MAX_CONSECUTIVE_UNSTARTEDS = 10;


export const TYPEFORM_IDS = {
    en: 'YrorisFO',
    pt: 'mGm8CpLN',
    es: 'qvTYow5z'
}

export const MANIFESTO_URLS = {
    en: 'https://www.notion.so/Manifesto-67893dc149344cc584db864ee2efe2ab',
    pt: 'https://www.notion.so/Manifesto-dac06fb54a264b719a299f06705f15bf',
    es: 'https://www.notion.so/Manifesto-dac06fb54a264b719a299f06705f15bf'
}

export const AIRTABLE_URLS = {
    en: 'https://airtable.com/shrgvuvz15vg55wPJ',
    pt: 'https://airtable.com/shrAnseaRWniVl9ar',
    es: 'https://airtable.com/shrHCLAm52BwBM2Lo'
}