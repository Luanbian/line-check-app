import React from 'react'
import Manager, { type ParamList } from '../../../../presentation/pages/manager/manager'
import { makeWorkInfoComplete } from '../../data/work/work.info.factory'
import { makeCreateVehicle } from '../../data/transport/vehicle.factory'
import { makeCreateService } from '../../data/transport/service.factory'
import { makeCreateManufacture } from '../../data/transport/manufacture.factory'
import { makeCreateLogistic } from '../../data/transport/logistic.factory'
import { type RouteProp } from '@react-navigation/native'

interface Props {
  route: RouteProp<ParamList, 'MANAGER'>
}

export const makeManager: React.FC<Props> = ({ route }) => {
  const workInfoComplete = makeWorkInfoComplete()
  const createVehicle = makeCreateVehicle()
  const createService = makeCreateService()
  const createManufacture = makeCreateManufacture()
  const createLogistic = makeCreateLogistic()
  return (
    <Manager
      workInfoComplete={ workInfoComplete }
      createVehicle={createVehicle}
      createService={createService}
      createManufacture={createManufacture}
      createLogistic={createLogistic}
      route={ route }
    />
  )
}
