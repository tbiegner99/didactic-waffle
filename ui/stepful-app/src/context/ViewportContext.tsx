import React, { useState, useEffect, useMemo } from 'react';

export const ViewportContext = React.createContext(false);

const MOBILE_BREAKPOINT = 700;

const isMobileView = () => window.innerWidth < MOBILE_BREAKPOINT;

export const ViewportContextProvider = function (props: any) {
    const [isMobile, setMobile] = useState(isMobileView());
    const context = useMemo(() => ({ isMobile }),[]);
    useEffect(() => {
        const checkMobile = () => {
            setMobile(isMobileView());
        };
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    });
    return <ViewportContext.Provider {...props} value={context} />;
};
