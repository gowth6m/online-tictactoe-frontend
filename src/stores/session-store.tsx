import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { AppConfig } from "@/config/app-config";
import ApiClient from "@/services/api-client";

type Session = {
    id: string;
    expiresAt: Date;
};

type SessionState = {
    session: Session | null;
    resetSession: () => void;
    initialiseSession: () => Promise<void>;
    loading: boolean;
};

const createSession = (): Session => {
    return {
        id: uuidv4(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
};

export const useSessionStore = create<SessionState>()(
    persist(
        (set, get) => ({
            session: null,
            loading: true,
            resetSession: () => {
                const newSession = createSession();
                ApiClient.setAuthorizationHeader(newSession.id);
                set({ session: newSession, loading: false });
            },
            initialiseSession: async () => {
                set({ loading: true });
                const { session } = get();
                let newSession: Session | null = null;
                if (session) {
                    const currentTime = new Date().getTime();
                    const expiryTime = new Date(session.expiresAt).getTime();

                    if (currentTime >= expiryTime) {
                        newSession = createSession();
                    } else {
                        newSession = session;
                    }
                } else {
                    newSession = createSession();
                }

                if (newSession) {
                    set({ session: newSession });
                    await ApiClient.setAuthorizationHeader(newSession.id);
                }
                set({ loading: false });
            },
        }),
        {
            name: AppConfig.localStorageKey.session,
            storage: createJSONStorage(() => localStorage),
        }
    )
);
