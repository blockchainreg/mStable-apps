import React, { FC } from 'react'
import { Button, IPFSImg, UserIcon } from '@apps/components/core'
import { truncateAddress } from '@apps/formatters'
import styled from 'styled-components'
import { AddressInput } from '@apps/components/forms'
import { useDelegationModal } from '../hooks/useDelegationModal'
import { useStakingStatus } from '../context/StakingStatusProvider'
import { useModalData } from 'libs/base/src/lib/context/ModalDataProvider'
import { useDelegateesAll } from '../context/DelegateeListsProvider'

interface Props {
  className?: string
}

const Address = styled.div`
  span {
    ${({ theme }) => theme.mixins.numeric};
    font-weight: 300;
    font-size: 1rem;
  }
`

const User = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  * {
    line-height: 1rem;
  }

  h3 {
    font-size: 1rem;
  }

  span {
    ${({ theme }) => theme.mixins.numeric};
    font-weight: 300;
    font-size: 0.75rem;
  }
`

const Info = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 0.5rem;

  > div:first-child {
    height: 2rem;
    width: 2rem;

    * {
      border-radius: 50%;
      overflow: hidden;
      width: 100% !important;
      height: 100% !important;
    }
  }
`

const Delegation = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  line-height: 3rem;
`

const Container = styled.div`
  background: ${({ theme }) => theme.color.background[0]};
  padding: 0.25rem 0.5rem;
  display: flex;
  gap: 0.5rem;
  border-radius: 1rem;
  margin-top: 0.75rem;
  align-items: center;
  height: 3.25rem;
  justify-content: space-between;

  > h3,
  button {
    font-size: 0.875rem;
  }

  > h3 {
    margin-left: 0.25rem;
  }
`

export const DelegateSelection: FC<Props> = ({ className }) => {
  const [showModal] = useDelegationModal()
  const { delegateSelection: delegatee } = useModalData()
  const delegateesAll = useDelegateesAll()
  const delegateeInfo = delegateesAll[delegatee]

  return (
    <Container className={className}>
      {delegatee ? (
        <Delegation>
          <Info>
            <div>{delegateeInfo ? <IPFSImg uri={delegateeInfo.avatarURI} /> : <UserIcon address={delegatee} />}</div>
            {delegateeInfo ? (
              <User>
                <h3>{delegateeInfo?.displayName}</h3>
                <span>{delegateeInfo?.ensName ?? truncateAddress(delegatee)}</span>
              </User>
            ) : (
              <Address>
                <span>{delegateeInfo?.ensName ?? truncateAddress(delegatee)}</span>
              </Address>
            )}
          </Info>
          <Button onClick={showModal}>Edit</Button>
        </Delegation>
      ) : (
        <>
          <h3>No selection</h3>
          <Button onClick={showModal}>Select Delegate</Button>
        </>
      )}
    </Container>
  )
}