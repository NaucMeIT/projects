'use dom'

import { DomComponent } from '~/code/DomComponent'

export function DomPage() {
  return (
    <div
      style={{
        background: 'red',
      }}
    >
      hello world
      <DomComponent />
    </div>
  )
}
