"use client";

import { useQuery } from "react-query";
import ApiClient from "../../services/api-client";
import LoadingTopbar from "../core/loading-topbar";

// --------------------------------------------------------------

const GameTitle = () => {
    const countQuery = useQuery({
        queryKey: "gameCount",
        queryFn: async () => {
            return ApiClient.game.getGamesCount();
        },
    });

    return (
        <>
            {countQuery.isLoading && <LoadingTopbar />}
            <div
                className="my-4 font-bold text-2xl relative tooltip tooltip-open tooltip-accent"
                data-tip={
                    countQuery.data?.data
                        ? `${countQuery.data?.data.data.count}/20 games online!`
                        : "Hey there 👋🏾"
                }
            >
                Tic Tac Toe{" "}
                <a
                    href={"https://gowtham.io"}
                    target={"_blank"}
                    className="absolute text-base -bottom-5 -right-5 text-primary italic whitespace-nowrap hover:underline"
                >
                    by Gowth6m
                </a>
            </div>
        </>
    );
};

export default GameTitle;
