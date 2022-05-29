import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
import useStore from "../../hooks/useStore";
import Datetime from "../../modules/Datetime";
import {observer} from "mobx-react-lite";
import { toJS } from "mobx";
import { statisticStyle } from "../../styles/Statistic";
import QuestsStatistic from "./QuestsStatistic";
import { sectionStyle } from "../../styles/Section";
import PurchasesStatistic from "./PurchasesStatistic";


function Statistic() {
    const statistic = statisticStyle();   
    return(
        <div>
            <div className={statistic.headline}>Статистика по заданиям</div>
            <QuestsStatistic/>
            <div className={statistic.headline}>Статистика по отдыху</div>
            <PurchasesStatistic/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Statistic;