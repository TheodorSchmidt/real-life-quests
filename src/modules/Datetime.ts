import { DateCoefficient } from "../models/Quest";
import Quest from "../models/Quest";
const Datetime = {
    dateToString: (date: Date) => {
        const dateForm = new Date(date);
        const dd = String(dateForm.getDate()).padStart(2, '0');
        const mm = String(dateForm.getMonth() + 1).padStart(2, '0');
        const yyyy = dateForm.getFullYear();
        const dateString = mm + '/' + dd + '/' + yyyy;
        return dateString;
    },
    yesterday: () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1)
        return Datetime.dateToString(yesterday);
    },
    calcDaysDifference: (date: Date) => {
        let today = new Date();
        let deadline = new Date(date);
        let timeDiff = deadline.getTime() - today.getTime();
        // console.log("Дедлайн: ", Datetime.dateToString(deadline), " , сегодня: ", Datetime.dateToString(today))
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
        quest.reward = Math.round(quest.reward * quest.dateModif);
    }
}

export default Datetime;

