import { isEmpty } from 'lodash'
import { useCallback, useEffect } from 'react'
import { atom, selector, useRecoilState, useResetRecoilState } from 'recoil'
import { AlgorithmInput } from 'src/types'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'
import { useResetSuggestions } from 'src/hooks/useResetSuggestions'

export const qrySeqInputsStorageAtom = atom<AlgorithmInput[]>({
  key: 'qrySeqInputsStorage',
  default: [],
})

export function useQuerySeqInputs() {
  const [qryInputs, setQryInputs] = useRecoilState(qrySeqInputsStorageAtom)
  const resetSeqInputsStorage = useResetRecoilState(qrySeqInputsStorageAtom)
  const resetSuggestions = useResetSuggestions()

  const addQryInputs = useCallback(
    (newInputs: AlgorithmInput[]) => {
      setQryInputs((inputs) => [...inputs, ...newInputs])
    },
    [setQryInputs],
  )

  const removeQryInput = useCallback(
    (index: number) => {
      setQryInputs((inputs) => inputs.filter((_, i) => i !== index))
    },
    [setQryInputs],
  )

  const clearQryInputs = useCallback(() => {
    resetSuggestions()
    resetSeqInputsStorage()
  }, [resetSeqInputsStorage, resetSuggestions])

  useEffect(() => {
    if (qryInputs.length === 0) {
      resetSuggestions()
    }
  }, [qryInputs, resetSuggestions])

  return { qryInputs, addQryInputs, removeQryInput, clearQryInputs }
}

export const refSeqInputAtom = atom<AlgorithmInput | undefined>({
  key: 'refSeqInput',
  default: undefined,
})

export const geneMapInputAtom = atom<AlgorithmInput | undefined>({
  key: 'geneMapInput',
  default: undefined,
})

export const refTreeInputAtom = atom<AlgorithmInput | undefined>({
  key: 'refTreeInput',
  default: undefined,
})

export const virusPropertiesInputAtom = atom<AlgorithmInput | undefined>({
  key: 'virusPropertiesInput',
  default: undefined,
})

export const hasRequiredInputsAtom = selector({
  key: 'hasRequiredInputs',
  get({ get }) {
    return !isEmpty(get(qrySeqInputsStorageAtom))
  },
})

/** Counts how many custom inputs are set */
export const inputCustomizationCounterAtom = selector<number>({
  key: 'inputCustomizationCounterAtom',
  get: ({ get }) => {
    return [get(refSeqInputAtom), get(geneMapInputAtom), get(refTreeInputAtom), get(virusPropertiesInputAtom)].filter(
      notUndefinedOrNull,
    ).length
  },
})

/** Resets all inputs (e.g. when switching datasets) */
export const inputResetAtom = selector<undefined>({
  key: 'inputReset',
  get: () => undefined,
  set({ reset }) {
    reset(qrySeqInputsStorageAtom)
    reset(refSeqInputAtom)
    reset(geneMapInputAtom)
    reset(refTreeInputAtom)
    reset(virusPropertiesInputAtom)
  },
})
