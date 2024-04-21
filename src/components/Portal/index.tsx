import { FC, ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
    children: ReactNode;
    rootId: string;
}

const Portal: FC<PortalProps> = ({ children, rootId }) => {
    const portalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const portalElement = document.createElement('div');
        portalElement.id = rootId;
        document.body.appendChild(portalElement);
        portalRef.current = portalElement;

        return () => {
            if (portalRef.current) {
                document.body.removeChild(portalRef.current);
                console.log('PORTAL')
            }
        };
    }, [rootId]);


    if (!portalRef.current) return null;

    return ReactDOM.createPortal(children, portalRef.current);
};

export default Portal;
