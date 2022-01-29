import { Queue, QueueEvents } from 'bullmq';

import { connection } from '../config/redis'

const myQueue = new Queue('stress', { connection });
const queueEvents = new QueueEvents('stress');

queueEvents.on('completed', (arg) => {
  console.log('completed', arg.returnvalue)
  myQueue.getJobCounts('wait', 'completed', 'failed').then(res => console.log(`Queue status: [Wait: ${res.wait}] [Completed: ${res.completed}] [Failed: ${res.failed}]`))
});