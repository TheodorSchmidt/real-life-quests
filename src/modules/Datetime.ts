import { DateCoefficient } from "../models/Quest";
import Quest from "../models/Quest";
const Datetime = {
    today: () => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const todayStr = mm + '/' + dd + '/' + yyyy;
        return todayStr;
    },
    calcDaysDifference: (date: Date) => {
        let today = new Date();
        let deadline = new Date(date);
        let timeDiff = deadline.getTime() - today.getTime();
        return (Math.ceil(timeDiff / (1000 * 3600 * 24)))
    },
    calcDateCoefficient: (difference: number) => {
        let coefficient: DateCoefficient;
        if (difference > 30) {
            coefficient = DateCoefficient["TooEarlier"];
        } else if (difference <= 30 && difference > 14) {
            coefficient = DateCoefficient["MonthEarlier"];
        } else if (difference <= 14 && difference > 7) {
            coefficient = DateCoefficient["TwoWeeksEarlier"];
        } else if (difference <= 7 && difference > 3) {
            coefficient = DateCoefficient["WeekEarlier"];
        } else if (difference <= 3 && difference > 0) {
            coefficient = DateCoefficient["ThreeDaysEarlier"];
        } else if (difference === 0) {
            coefficient = DateCoefficient["Today"];
        } else if (difference < 0 && difference > -3) {
            coefficient = DateCoefficient["ThreeDaysLater"];
        } else if (difference <= -3 && difference > -7) {
            coefficient = DateCoefficient["WeekLater"];
        } else if (difference <= -7 && difference > -14) {
            coefficient = DateCoefficient["TwoWeeksLater"];
        } else if (difference <= -14 && difference > -30) {
            coefficient = DateCoefficient["MonthLater"];
        } else {
            coefficient = DateCoefficient["TooLater"];
        }
        return coefficient;
    },
    newDateModif: (quest: Quest, modif: DateCoefficient) => {
        if (quest.dateModif) {
            quest.reward /= quest.dateModif;
        } 
        quest.dateModif = modif;
        quest.reward *= quest.dateModif;
    }
}

export default Datetime;

