import styles from './TakeProfitBody.module.scss'
import TakeProfitRow from "./TakeProfitRow.tsx";
import {AddCircle} from "@mui/icons-material";
import {useStore} from "../../context.tsx";
import {observer} from "mobx-react";
import useTakeProfitValidation from "../../useTakeProfitValidation.tsx";
import {OrderSide, ProfitTarget} from "../../model.ts";
interface TakeProfitBodyProps {
    activeOrderSide: OrderSide;
}
const TakeProfitBody = observer(({activeOrderSide}: TakeProfitBodyProps) => {
    const {
        price,
        addProfitTarget,
        updateProfitTarget,
        removeProfitTarget,
        projectedProfit,
        profitTargets
    } = useStore();
    const { validationErrors, validateForm } = useTakeProfitValidation(profitTargets);
    const handleRowChange = (updatedTarget: any, index: any) => {
        updateProfitTarget(updatedTarget, index)
    }

    const handleRemoveTarget = (index) => {
        removeProfitTarget(index);
    };

    const handleAddTarget = (e) => {
        e.preventDefault();
        if (validateForm() && profitTargets.length < 5) {
            const newProfit = profitTargets.length > 0 ? profitTargets[profitTargets.length - 1].profit + 2 : 2;
            const targetPrice =
                activeOrderSide === 'buy' ? price * (1 + newProfit / 100) : price * (1 - newProfit / 100);
            const newAmount = 20;
            const totalAmount = profitTargets.reduce((sum, target) => sum + target.amount, 0);
            const maxAmount = Math.min(100 - totalAmount, newAmount);
            addProfitTarget({ profit: newProfit, price: targetPrice, amount: maxAmount });
        }
    };


    return <div className={styles.root}>
        <div className={styles.header}>
            <div className={styles.headerItem}>
                <p>Profit</p>
            </div>
            <div className={styles.headerItem} style={{width: '45%'}}>
                <p>Target price</p>
            </div>
            <div className={styles.headerItem}>
                <p>Amount to {activeOrderSide == 'sell' ? 'buy': 'sell' }</p>
            </div>
        </div>
        <div className={styles.content}>
            {profitTargets.map((target, index) => (
                <TakeProfitRow
                    key={index}
                    data={target}
                    onChange={(updatedTarget: ProfitTarget) => handleRowChange(updatedTarget, index)}
                    onRemove={() => handleRemoveTarget(index)}
                    formPrice={price}
                    activeOrderSide={activeOrderSide}
                />
            ))}
            {Object.values(validationErrors).map((error, index) => (
                error && <div key={index} className={styles.validationError}>{error}</div>
            ))}
            <button className={styles.addProfit} onClick={handleAddTarget} disabled={profitTargets.length >= 5}>
                <AddCircle className={styles.addIcon}/>
                <p>Add profit target {profitTargets.length}/5</p>

            </button>
        </div>
        <footer>
            <div className={styles.footer}>
                <p>Projected profit</p>
                <span className={styles.dottedLine}></span>
                <p className={styles.profit}><span>{projectedProfit.toFixed(2)}</span> USDT</p>
            </div>
        </footer>
    </div>

})

export default TakeProfitBody