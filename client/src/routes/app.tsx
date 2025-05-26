import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";
import {
  createAction,
  deleteAction,
  getAllAction,
} from "../services/insight-service.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAction();
        setInsights(response?.insights);
      } catch (error) {
        console.error(`Error in fetching insights ${error}`);
      }
    };
    fetchData();
  }, []);

  const deleteInsight = async (id: Number) => {
    const res = await deleteAction(id);
    if (res.status === 200) {
      const insightsList = insights.filter((insight) => insight.id !== id);
      setInsights(insightsList);
    } else {
      console.error(res.msg);
    }
  };

  const createInsight = async (insight: any) => {
    const res = await createAction(insight);

    if (res.status === 201) {
      const insightsList = [...insights];
      insightsList.push(res.item);
      setInsights(insightsList);
      return true;
    } else {
      console.error(res.msg);
      return false;
    }
  };

  return (
    <main className={styles.main}>
      <Header createInsight={createInsight} />
      <Insights
        className={styles.insights}
        insights={insights}
        deleteInsight={deleteInsight}
      />
    </main>
  );
};
