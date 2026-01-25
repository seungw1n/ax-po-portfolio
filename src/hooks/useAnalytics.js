import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'wouter';

const useAnalytics = () => {
    const [location] = useLocation();

    useEffect(() => {
        // Initialize GA4 - Replace with actual Measurement ID
        // In production, this should come from env var
        ReactGA.initialize('G-MEASUREMENT_ID_PLACEHOLDER');
    }, []);

    useEffect(() => {
        // Send pageview on route change
        // Clean the path to standard format
        const path = location || '/';

        ReactGA.send({
            hitType: "pageview",
            page: path,
            title: document.title
        });

    }, [location]);

    const trackEvent = (category, action, label) => {
        ReactGA.event({
            category,
            action,
            label,
        });
    };

    return { trackEvent };
};

export default useAnalytics;
