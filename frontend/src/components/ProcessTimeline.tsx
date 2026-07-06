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
  desc: string
  lendOnly?: boolean
}

const STEPS: StepDef[] = [
  {
    icon: <IconMessageSquare size={16} />,
    title: 'Anfragen',
    desc: 'Anfrage mit Kontaktangabe senden. Die Anbieter*in entscheidet.',
  },
  {
    icon: <IconSmartphone size={16} />,
    title: 'Details klären',
    desc: 'Direkt via WhatsApp, SMS oder Signal koordinieren.',
  },
  {
    icon: <IconMapPin size={16} />,
    title: 'Abholen',
    desc: 'Gegenstand bei der Anbieter*in vor Ort abholen.',
  },
  {
    icon: <IconRepeat size={16} />,
    title: 'Zurückgeben',
    desc: 'Gegenstand rechtzeitig und in gutem Zustand zurückbringen.',
    lendOnly: true,
  },
  {
    icon: <IconStar size={16} />,
    title: 'Bestätigen & Bewerten',
    desc: 'Austausch bestätigen und die andere Person bewerten.',
  },
]

interface Props {
  offerType: OfferType
  activeStep?: number
  compact?: boolean
}

export function ProcessTimeline({ offerType, activeStep = 0, compact = false }: Props) {
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
                <StepDesc>{step.desc}</StepDesc>
              )}
            </StepBody>
          </StepRow>
        )
      })}
    </TimelineWrapper>
  )
}
