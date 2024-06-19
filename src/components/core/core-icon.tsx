import {
    IconProps,
    UserCircle,
    GlobeHemisphereWest,
    WifiSlash,
    UserPlus,
} from "phosphor-react";

interface CoreIconType {
    [key: string]: React.FC<IconProps>;
}

const CoreIcon: CoreIconType = {
    UserCircle,
    GlobeHemisphereWest,
    WifiSlash,
    UserPlus,
};

export default CoreIcon;
