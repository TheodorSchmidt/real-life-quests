import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
import useStore from "../../hooks/useStore";
import Datetime from "../../modules/Datetime";
import {observer} from "mobx-react-lite";
import { toJS } from "mobx";
import { statisticStyle } from "../../styles/Statistic";

const dataSet = [
    {
      date: "05/24/2022",
      rest: 0,
      quest: 2, 
    },
    {
      date: "05/25/2022",
      rest: 3,
      quest: 1, 
    },
    {
      date: "05/26/2022",
      rest: 1,
      quest: 4, 
    },
    {
      date: "05/27/2022",
      rest: 2,
      quest: 1, 
    },
    {
      date: "05/28/2022",
      rest: 1,
      quest: 1, 
    },
    {
      date: "05/29/2022",
      rest: 2,
      quest: 3, 
    },
    {
      date: "05/30/2022",
      rest: 1,
      quest: 5, 
    }
  ];

function QuestsStatistic() {
    const statistic = statisticStyle();
    const {quests, makeQuestStatistic, questStatistic} = useStore();
    let map = new Map();
    let neededQuests = quests.filter(q => q.dateComplete !== undefined && q.status === 2);
    neededQuests.forEach(quest => {
        const date = Datetime.dateToString(quest.dateComplete);
        if (map.get(date)) {
            const newVal = map.get(date) + 1;
            map.set(date, newVal);
        } else {
            map.set(date, 1);
        }
    })
    // let data = [...map].map(([date, quest]) => ({date, quest}));
    // makeQuestStatistic(data);
    return(
        <div className={statistic.chart}>
            <LineChart
                width={1000}
                height={300}
                data={dataSet}
                margin={{
                    top: 5,
                    right: 30,
                    left: 10,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quest" stroke="#8884d8" activeDot={{ r: 8 }}/>
            </LineChart>
        </div>
    )
}

export default observer(QuestsStatistic)