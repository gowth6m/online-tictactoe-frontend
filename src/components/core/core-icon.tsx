import {
    IconProps,
    UserCircle,
    GlobeHemisphereWest,
    WifiSlash,
    UserPlus,
    User,
    Circle,
    X,
} from "phosphor-react";

interface CoreIconType {
    [key: string]: React.FC<IconProps>;
}

const CoreIcon: CoreIconType = {
    UserCircle,
    GlobeHemisphereWest,
    WifiSlash,
    UserPlus,
    User,
    Circle,
    X,
};

export default CoreIcon;
