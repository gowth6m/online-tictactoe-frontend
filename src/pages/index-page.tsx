import GameTitle from "@/components/game/game-title";
import JoinOnlineGameButton from "@/components/game/join-online-game-button";
import LocalGameButton from "@/components/game/local-game-button";
import NewOnlineGameButton from "@/components/game/new-online-game-button";
import SessionInfo from "@/components/session/session-info";

export default function IndexPage() {
    return (
        <div className="flex flex-col mt-10 items-center gap-10 py-8">
            <GameTitle />

            <div className="flex flex-col gap-4">
                <LocalGameButton />
                <NewOnlineGameButton />
                <JoinOnlineGameButton />
            </div>

            <SessionInfo />
        </div>
    );
}
