import isEqual from 'react-fast-compare'
import React, { SVGProps, useCallback, useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import type { NucleotideMissing } from 'src/algorithms/types'
import { Tooltip } from 'src/components/Results/Tooltip'
import { BASE_MIN_WIDTH_PX, N } from 'src/constants'
import { formatRange } from 'src/helpers/formatRange'
import { getNucleotideColor } from 'src/helpers/getNucleotideColor'
import { getSafeId } from 'src/helpers/getSafeId'
import {
  getSeqMarkerDims,
  SeqMarkerHeightState,
  seqMarkerMissingHeightStateAtom,
} from 'src/state/seqViewSettings.state'

const missingColor = getNucleotideColor(N)

export interface MissingViewProps extends SVGProps<SVGRectElement> {
  seqName: string
  missing: NucleotideMissing
  pixelsPerBase: number
}

export function SequenceMarkerMissingUnmemoed({ seqName, missing, pixelsPerBase, ...rest }: MissingViewProps) {
  const { t } = useTranslation()
  const [showTooltip, setShowTooltip] = useState(false)
  const onMouseEnter = useCallback(() => setShowTooltip(true), [])
  const onMouseLeave = useCallback(() => setShowTooltip(false), [])

  const seqMarkerMissingHeightState = useRecoilValue(seqMarkerMissingHeightStateAtom)
  const { y, height } = useMemo(() => getSeqMarkerDims(seqMarkerMissingHeightState), [seqMarkerMissingHeightState])

  if (seqMarkerMissingHeightState === SeqMarkerHeightState.Off) {
    return null
  }

  const { begin, end } = missing // prettier-ignore

  const id = getSafeId('missing-marker', { seqName, ...missing })
  let width = (end - begin) * pixelsPerBase
  width = Math.max(width, BASE_MIN_WIDTH_PX)
  const halfNuc = Math.max(pixelsPerBase, BASE_MIN_WIDTH_PX) / 2 // Anchor on the center of the first nuc
  const x = begin * pixelsPerBase - halfNuc

  const rangeStr = formatRange(begin, end)

  return (
    <rect
      id={id}
      fill={missingColor}
      x={x}
      y={y}
      width={width}
      height={height}
      {...rest}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Tooltip target={id} isOpen={showTooltip}>
        {t('Missing: {{range}}', { range: rangeStr })}
      </Tooltip>
    </rect>
  )
}
export const SequenceMarkerMissing = React.memo(SequenceMarkerMissingUnmemoed, isEqual)
