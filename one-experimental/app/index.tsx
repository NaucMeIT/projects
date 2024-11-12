import { Image } from '@tamagui/image-next'
import { Text, YStack } from 'tamagui'
import { ToggleThemeButton } from '~/code/ToggleThemeButton'
import { DomComponent } from '~/code/DomComponent'
import oneBall from '/app-icon.png?url'
import { Button } from "vite-rslib-ui"

export function HomePage() {
  return (
    <YStack bg="$color1" mih="100%" gap="$4" ai="center" jc="center" f={1}>
      <Text fontSize={20}>Hello, world</Text>
      <Image src={oneBall} width={128} height={128} />
      <ToggleThemeButton />
      <DomComponent />
      <Button />
    </YStack>
  )
}
