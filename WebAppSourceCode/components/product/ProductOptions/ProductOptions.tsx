import { memo } from 'react'
import { Swatch } from '@components/product'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import { v4 as uuidv4 } from 'uuid';
interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  return (
    <div>
      {options && options.length !== 0 ? (
        <>
          {options.map((opt) => (
            <div className="pb-4" key={`${opt.displayName}-${uuidv4()}`}>
              <h2 className="uppercase font-medium text-sm tracking-wide">
                {opt.displayName}
              </h2>
              <div role="listbox" className="flex flex-row py-4">
                {opt.values ? (<>
                  {opt.values.map((v, i: number) => {
                    const active = selectedOptions[opt.displayName.toLowerCase()]
                    return (
                      <Swatch
                        key={`${opt.id}-${i}`}
                        active={v.label.toLowerCase() === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setSelectedOptions((selectedOptions) => {
                            return {
                              ...selectedOptions,
                              [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                            }
                          })
                        }}
                      />
                    )
                  })}
                </>) : null}

              </div>
            </div>
          ))}
        </>
      ) : null}

    </div>
  )
}

export default memo(ProductOptions)
