import { Doctor } from "../interface/doctor"
import { DoctorCard } from './doctorCard';
import { getHistoryFromApi } from '../api/history'
import { HistoryModel } from "../interface/history";

type HistoryProps = {
  history: Array<HistoryModel>
}

export const History = ({history}: HistoryProps) => {
  return     <div className="grid grid-cols-4 space-y-2 gap-2">
        {history.map((h: HistoryModel, i: number) => (
            <div>
                <p>{h.doctorName}</p>
                <p>searched: {h.dateSearched}</p>
            </div>
        ))}
    </div>
}