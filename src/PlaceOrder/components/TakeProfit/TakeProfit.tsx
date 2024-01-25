import {observer} from "mobx-react";
import {useStore} from "../../context.tsx";
import TakeProfitBody from "../TakeProfitBody/TakeProfitBody.tsx";
import styles from "./TakeProfit.module.scss";
import {Switch} from "../../../shared/components/Switch/Switch.tsx";
import {QuestionTooltip} from "../../../shared/components/QuestionTooltip/QuestionTooltip.tsx";



const TakeProfit = observer(() => {
    const {
        activeOrderSide,
        setShowContent,
        showContent
    } = useStore();

    const handleChange = (value: boolean) => {
        setShowContent(value)
    };
  return <div className={styles.root}>
      <header className={styles.header}>
          <div className={styles.label}>
              <p>Take Profit{" "}</p>
              <QuestionTooltip message="Take profit description"/>
          </div>
          <div className={styles.switchContent}>
              <Switch
                  checked={showContent}
                  onChange={handleChange}
              />
          </div>
      </header>

    {showContent && (
        <div className="content">
        <TakeProfitBody activeOrderSide={activeOrderSide}/>
        </div>
    )}



  </div>;
});

export {TakeProfit};
