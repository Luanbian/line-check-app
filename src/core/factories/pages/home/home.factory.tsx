import React from 'react'
import Home from '../../../../presentation/pages/home/home'
import { makeWorkInfo } from '../../data/work/work.info.factory'
import { makeLocalStorage } from '../../infra/adapters/local.storage.factory'
import { makeUpdateLinecheck } from '../../data/work/update.linecheck.factory'
import { makeInsertKm } from '../../data/work/insert.km.factory'
import { makeNotificationService } from '../../data/service/notification.factory'

export const makeHome: React.FC = () => {
  const workInfo = makeWorkInfo()
  const localStorage = makeLocalStorage()
  const updateLinecheck = makeUpdateLinecheck()
  const insertKm = makeInsertKm()
  const notification = makeNotificationService()
  return (
    <Home
      getWorkInfo={ workInfo }
      localStorage={ localStorage }
      updateLinecheck={ updateLinecheck }
      insertKm={ insertKm }
      notification={ notification }
    />
  )
}
