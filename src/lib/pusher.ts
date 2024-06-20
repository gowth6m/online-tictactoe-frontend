import Pusher from 'pusher-js';
import { z } from 'zod';

// Parsing environment variables using Zod with fallback and debugging
const pusherClientKeySchema = z.string().min(1, "VITE_PUSHER_APP_KEY is not defined");
const pusherClientClusterSchema = z.string().min(1, "VITE_PUSHER_CLUSTER is not defined");

const pusherClientKey = pusherClientKeySchema.parse(import.meta.env.VITE_PUSHER_APP_KEY || 'default-key');
const pusherClientCluster = pusherClientClusterSchema.parse(import.meta.env.VITE_PUSHER_CLUSTER || 'default-cluster');

const pusher = new Pusher(pusherClientKey, {
    cluster: pusherClientCluster,
});


export default pusher;
