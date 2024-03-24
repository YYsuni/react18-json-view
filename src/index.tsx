import JsonView, { defaultURLRegExp, JsonViewProps } from './components/json-view'
import { stringifyForCopying as stringify } from './utils'

import { ReactComponent as EditSVG } from './svgs/edit.svg'
import { ReactComponent as DeleteSVG } from './svgs/trash.svg'
import { ReactComponent as DoneSVG } from './svgs/done.svg'
import { ReactComponent as CancelSVG } from './svgs/cancel.svg'
import { ReactComponent as CopySVG } from './svgs/copy.svg'
import { ReactComponent as CopiedSVG } from './svgs/copied.svg'
import { ReactComponent as LinkSVG } from './svgs/link.svg'

export { JsonView as default, stringify, defaultURLRegExp, EditSVG, DeleteSVG, DoneSVG, CancelSVG, CopySVG, CopiedSVG, LinkSVG }
export type { JsonViewProps }
