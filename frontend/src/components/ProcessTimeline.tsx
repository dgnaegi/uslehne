import type { OfferType } from '../api/types'
import { IconMessageSquare, IconSmartphone, IconMapPin, IconRepeat, IconStar } from '../icons'
import {
  TimelineWrapper,
  StepRow,
  StepLeft,
  StepDot,
  StepLine,
  StepBody,
  StepTitle,
  StepDesc,
} from './ProcessTimeline.styled'

type StepState = 'done' | 'active' | 'future'

interface StepDef {
  icon: React.ReactNode
  title: string
  descRequester: string
  descOwner: string
  lendOnly?: boolean
}

const STEPS: StepDef[] = [
  {
    icon: <IconMessageSquare size={16} />,
    title: 'Anfragen',
    descRequester: 'Die Anbieter*in entscheidet über deine Anfrage.',
    descOwner: 'Neue Anfrage eingegangen. Nimm sie an oder lehne sie ab.',
  },
  {
    icon: <IconSmartphone size={16} />,
    title: 'Details klären',
    descRequester: 'Kontaktiere die Anbieter*in und klärt Ort und Zeit für die Abholung.',
    descOwner: 'Kontaktiere die anfragende Person und klärt Ort und Zeit für die Übergabe.',
  },
  {
    icon: <IconMapPin size={16} />,
    title: 'Abholen',
    descRequester: 'Hol den Gegenstand bei der Anbieter*in vor Ort ab.',
    descOwner: 'Übergib den Gegenstand der abholenden Person.',
  },
  {
    icon: <IconRepeat size={16} />,
    title: 'Zurückgeben',
    descRequester: 'Bring den Gegenstand rechtzeitig und in gutem Zustand zurück.',
    descOwner: 'Warte auf die Rückgabe des Gegenstands.',
    lendOnly: true,
  },
  {
    icon: <IconStar size={16} />,
    title: 'Bestätigen & Bewerten',
    descRequester: 'Bestätige den Austausch und bewerte die Anbieter*in.',
    descOwner: 'Bestätige den Eingang und bewerte die anfragende Person.',
  },
]

interface Props {
  offerType: OfferType
  activeStep?: number
  compact?: boolean
  role?: 'owner' | 'requester'
}

export function ProcessTimeline({ offerType, activeStep = 0, compact = false, role }: Props) {
  const steps = STEPS.filter((s) => !s.lendOnly || offerType === 'LEND')

  return (
    <TimelineWrapper>
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1
        const state: StepState =
          activeStep < 0
            ? 'future'
            : idx < activeStep
              ? 'done'
              : idx === activeStep
                ? 'active'
                : 'future'

        const desc = role === 'owner' ? step.descOwner : step.descRequester

        return (
          <StepRow key={step.title}>
            <StepLeft>
              <StepDot $state={state} aria-hidden="true">
                {step.icon}
              </StepDot>
              {!isLast && <StepLine $done={state === 'done'} />}
            </StepLeft>
            <StepBody $compact={compact}>
              <StepTitle $state={state} $compact={compact}>
                {step.title}
              </StepTitle>
              {(!compact || state === 'active') && state !== 'future' && (
                <StepDesc>{desc}</StepDesc>
              )}
            </StepBody>
          </StepRow>
        )
      })}
    </TimelineWrapper>
  )
}
