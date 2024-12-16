import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  query,
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TimelineEvent } from '../types';
import { TimelineEventData, UsageData } from '../types/firebase';
import { format } from 'date-fns';

const COLLECTION_NAME = 'timeline_data';

class TimelineService {
  private async handleError(error: unknown, operation: string): Promise<never> {
    console.error(`Timeline service error (${operation}):`, error);
    throw new Error(`Failed to ${operation}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  async saveEvents(events: TimelineEvent[], date: Date): Promise<void> {
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const docRef = doc(db, COLLECTION_NAME, dateStr);
      
      const data: UsageData = {
        date: dateStr,
        events: events.map(event => ({
          ...event,
          date: dateStr
        })),
        timestamp: serverTimestamp()
      };

      await setDoc(docRef, data);
    } catch (error) {
      await this.handleError(error, 'save events');
    }
  }

  async getEvents(date: Date): Promise<TimelineEvent[]> {
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const docRef = doc(db, COLLECTION_NAME, dateStr);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return [];
      }

      const data = docSnap.data() as UsageData;
      return data.events;
    } catch (error) {
      await this.handleError(error, 'get events');
    }
  }

  async getUsageDates(): Promise<Date[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs
        .map(doc => {
          const data = doc.data() as UsageData;
          return new Date(data.date);
        })
        .sort((a, b) => b.getTime() - a.getTime());
    } catch (error) {
      await this.handleError(error, 'get usage dates');
    }
  }
}

export const timelineService = new TimelineService();