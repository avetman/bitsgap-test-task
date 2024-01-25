import styles from "./TakeProfitBody.module.scss";
import {AddCircle, Close} from "@mui/icons-material";
import {NumberInput} from "../../../shared/components/NumberInput/NumberInput.tsx";
const TakeProfitRow = ({data, onChange,onRemove, formPrice,activeOrderSide }) => {
    console.log(data)
    const defaoultPrice = data.price.toFixed(2) == 0 && formPrice > 0 ?
        activeOrderSide === 'buy' ? formPrice * (1 + data.profit / 100) : formPrice * (1 - data.profit / 100) :
        data.price.toFixed(2)
    const handleInputChange = (value, field) => {
        onChange({
            ...data,
            [field]: value,
        });
    };
    return (
       <div className={styles.contentItemRow}>
           <div className={styles.numberInput}>
               <NumberInput
                   value={data.profit}
                   onChange={(value) => handleInputChange(value, 'profit')}
               />
               <span > %</span>
           </div>
           <div style={{width: '30%'}} className={styles.numberInput}>
               <NumberInput
                   value={defaoultPrice}
                   onChange={(value) => handleInputChange(value, "price")}
               />
                <span className={styles.ml2}>USDT</span>
            </div>
            <div className={styles.numberInput}>
                <NumberInput
                    value={data.amount}
                    onChange={(value) => handleInputChange(value, 'amount')}
                />
                <span > %</span>
            </div>
            <div className={styles.closeIcon} onClick={onRemove}>
                <Close/>
            </div>
        </div>
    )
}

export default TakeProfitRow