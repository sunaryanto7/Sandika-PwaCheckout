import { ContainerExtraFee } from "@app/modules/checkout/container/additional_fees/container";

const View = () => {
  return (
    <div className="container-additional-fees">
      <div className="block">
        <div className="block-title">
          <h4>Additional Fees And Promotion</h4>
        </div>
        <div className="block-content">
          <div className="additional-fees-content">
            <ContainerExtraFee />
          </div>
        </div>
      </div>
    </div>
  )
}

const ContainerAdditionalFees = () => {
  return <View />
};


export default ContainerAdditionalFees