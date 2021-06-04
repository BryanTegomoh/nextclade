import React, { SVGProps, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Row, Col, Table as ReactstrapTable } from 'reactstrap'
import styled from 'styled-components'

import { AA_MIN_WIDTH_PX } from 'src/constants'

import type { AminoacidChange, AminoacidChangesGroup } from 'src/components/SequenceView/groupAdjacentAminoacidChanges'

import { formatAAMutation } from 'src/helpers/formatMutation'
import { getAminoacidColor } from 'src/helpers/getAminoacidColor'
import { getSafeId } from 'src/helpers/getSafeId'
import { Tooltip } from 'src/components/Results/Tooltip'
import { PeptideContext } from './PeptideContext'

export const Table = styled(ReactstrapTable)`
  & td {
    padding: 0 0.5rem;
  }

  & tr {
    margin: 0;
    padding: 0;
  }
`

export interface PeptideMarkerMutationProps {
  change: AminoacidChange
  parentGroup: AminoacidChangesGroup
  pixelsPerAa: number
}

export function PeptideMarkerMutation({ change, parentGroup, pixelsPerAa, ...restProps }: PeptideMarkerMutationProps) {
  const { codon, queryAA } = change
  const { codonAaRange } = parentGroup

  const pos = codon - codonAaRange.begin
  const x = pos * Math.max(AA_MIN_WIDTH_PX, pixelsPerAa)
  const width = Math.max(AA_MIN_WIDTH_PX, pixelsPerAa)
  const fill = getAminoacidColor(queryAA)

  return <rect fill={fill} stroke="#777a" strokeWidth={0.5} x={x} width={width} height="30" {...restProps} />
}

export interface PeptideMarkerMutationGroupProps extends SVGProps<SVGSVGElement> {
  seqName: string
  group: AminoacidChangesGroup
  pixelsPerAa: number
}

function PeptideMarkerMutationGroupUnmemoed({
  seqName,
  group,
  pixelsPerAa,
  ...restProps
}: PeptideMarkerMutationGroupProps) {
  const { t } = useTranslation()
  const [showTooltip, setShowTooltip] = useState(false)

  const { gene, changes, codonAaRange, queryContext, refContext, contextNucRange } = group
  const id = getSafeId('aa-mutation-group-marker', { seqName, gene, begin: codonAaRange.begin })
  const x = codonAaRange.begin * pixelsPerAa
  const width = changes.length * Math.max(AA_MIN_WIDTH_PX, pixelsPerAa)

  return (
    <g id={id}>
      <rect fill="#999a" x={x - 0.5} y={-10} width={width + 1} stroke="#aaaa" strokeWidth={0.5} height={32} />
      <svg x={x} y={-9.5} height={29} {...restProps}>
        <g onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          {changes.map((change) => (
            <PeptideMarkerMutation key={change.codon} change={change} parentGroup={group} pixelsPerAa={pixelsPerAa} />
          ))}

          <Tooltip target={id} isOpen={showTooltip} wide>
            <Table borderless className="mb-1">
              <thead />
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <h5>{seqName}</h5>
                  </td>
                </tr>

                <tr className="mb-2">
                  <td colSpan={2}>
                    <h6>{t('Aminoacid changes ({{count}})', { count: changes.length })}</h6>
                  </td>
                </tr>

                <>
                  {changes.map((change) => (
                    <tr key={change.codon}>
                      <td>{change.type === 'substitution' ? t('Substitution') : t('Deletion')}</td>
                      <td>
                        <pre className="my-0">{formatAAMutation(change)}</pre>
                      </td>
                    </tr>
                  ))}
                </>

                <PeptideContext queryContext={queryContext} refContext={refContext} contextNucRange={contextNucRange} />
              </tbody>
            </Table>

            <Row noGutter className="mt-2 mx-1">
              <Col style={{ lineHeight: '90%' }}>
                <small>
                  {t(
                    '* - Context shows nucleotide triplets corresponding to the changes in aminoacids, as well as surrounding triplets: one on the left and one on the right',
                  )}
                </small>
              </Col>
            </Row>
          </Tooltip>
        </g>
      </svg>
    </g>
  )
}

export const PeptideMarkerMutationGroup = React.memo(PeptideMarkerMutationGroupUnmemoed)
