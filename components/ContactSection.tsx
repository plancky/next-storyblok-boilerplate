'use client'
import { storyblokEditable } from '@storyblok/react/rsc'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from './ui/input'
import IconRightArrow from './icons/IconRightArrow'
import { BGFooterSVG, BGFooterSVGMobile } from './icons/BGFooterSVG'
import { useMediaQuery } from './hooks/useMediaQuery'
import React from 'react'
import { sendMail } from '@/app/resend/trigger/action'
import { ModContactFormType } from './Email-template'
import IconClose from './icons/IconClose'

const formPlaceholders: { [key: string]: string } = {
    firstname: 'First Name*',
    lastname: 'Last Name*',
    email: 'Email*',
    linkedinUrl: 'Linkedin URL',
    sector: 'Sector',
    roundsize: 'Round Size',
    pitchdeckUrl: 'Link to Pitch Deck',
    pitchdeck: 'Upload Pitch Deck',
    message:
        "Tell us what you're looking for, the team and how you're different from the competition.",
}

export type ContactFormType = z.infer<typeof formSchema>

const formSchema = z.object({
    firstname: z
        .string({
            required_error: 'First Name is required',
            invalid_type_error: 'Invalid name',
        })
        .min(2, "Name can't be less than 2 characters")
        .max(50, "Name can't be more than 50 characters"),
    lastname: z
        .string({
            required_error: 'Last Name is required',
            invalid_type_error: 'Invalid name',
        })
        .min(2, "Name can't be less than 2 characters")
        .max(50, "Name can't be more than 50 characters"),
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Invalid Email',
        })
        .email(),
    linkedinUrl: z.optional(z.string({})),
    sector: z.optional(z.string()),
    roundsize: z.optional(z.string()),
    pitchdeckUrl: z.optional(z.string()),
    pitchdeck: z.optional(
        z
            .instanceof(File)
            .refine((file) => {
                // file size less than 40mb
                return file.size < 20 * 1024 * 1024
            }, "File size can't exceed 20MB")
            .refine((file) => {
                // file type document, pdf and ppt
                const allowedTypes = ['application/pdf']

                return allowedTypes.includes(file.type)
            }, 'Only PDF files are allowed')
    ),
    message: z.optional(z.string()),
})
export function ContactSection({ blok }: { blok: any }) {
    const isMobile = useMediaQuery('(max-width: 1023px)')
    const [loading, setLoading] = React.useState(false)
    const fileField = React.useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            linkedinUrl: '',
            pitchdeckUrl: '',
            message: '',
            roundsize: '',
            sector: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        let modifiedValues: ModContactFormType
        if (values.pitchdeck) {
            const fileArrayBuffer = await values.pitchdeck.arrayBuffer()
            const fileEncodedString =
                Buffer.from(fileArrayBuffer).toString('base64')
            modifiedValues = {
                ...values,
                fileType: 'pdf',
                pitchdeck: fileEncodedString,
            }
        } else {
            modifiedValues = {
                ...values,
                pitchdeck: '',
            }
        }
        const response = await sendMail(modifiedValues).then((res) => {
            setLoading(true)
            return res
        })
        form.reset()
    }

    return (
        <section
            {...storyblokEditable(blok)}
            id="contact"
            className="relative content-grid min-h-[910px] lg:min-h-[660px] bg-primary"
        >
            {isMobile ? (
                <div className="full-width-gridless overflow-hidden pointer-events-none absolute z-[0] top-0 left-0 w-full h-full">
                    <BGFooterSVGMobile />
                </div>
            ) : (
                <div className="full-width-gridless absolute overflow-hidden z-[0] pointer-events-none top-0 left-0 w-full h-full">
                    <BGFooterSVG />
                </div>
            )}
            <div className="flex content lg:breakout xl:content lg:flex-row flex-col lg:justify-between gap-10 z-[1] mt-[60px] mb-10 lg:my-20">
                <div>
                    {blok.heading && (
                        <h1 className="whitespace-pre text-wrap text-h5 lg:text-h3 text-coconut">
                            {blok.heading}
                        </h1>
                    )}
                    {blok.subheading && (
                        <p className="whitespace-pre lg:w-fit w-3/4 text-wrap text-copy5 mt-[30px] lg:mt-10 lg:text-copy2 text-coconut">
                            {blok.subheading}
                        </p>
                    )}
                </div>
                {form.formState.isSubmitSuccessful ? (
                    <div className="space-y-5 basis-full lg:basis-2/5 font-secondary text-coconut lg:text-copy5 text-copy6">
                        <p>{blok.submitted_title}</p>
                        <p>{blok.submitted_subtitle}</p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid grid-cols-1 lg:grid-cols-2 w-full basis-full h-fit lg:basis-2/5 lg:gap-x-3 gap-y-4 lg:gap-y-10"
                        >
                            {blok.form_fields.map((field: string) => {
                                return (
                                    <ContactInput
                                        key={field}
                                        formInstance={form}
                                        fieldRef={
                                            field === 'pitchdeck'
                                                ? fileField
                                                : undefined
                                        }
                                        customClass={`text-coconat ${
                                            field === 'message'
                                                ? 'lg:mt-0 mt-6 col-span-full'
                                                : ''
                                        } ${
                                            field === 'pitchdeck' ||
                                            field === 'pitchdeckUrl'
                                                ? 'col-span-full'
                                                : ''
                                        }`}
                                        type={
                                            field === 'pitchdeck'
                                                ? 'file'
                                                : 'text'
                                        }
                                        control={form.control}
                                        textArea={field === 'message'}
                                        name={field}
                                        label={
                                            field === 'message' ||
                                            field === 'pitchdeck'
                                                ? formPlaceholders[field]
                                                : ''
                                        }
                                        placeholder={
                                            field !== 'message'
                                                ? formPlaceholders[field]
                                                : ''
                                        }
                                    />
                                )
                            })}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-primary col-span-full disabled:opacity-50 group flex gap-3 lg:mt-0 mt-6 text-subheading2 hover:bg-coconut hover:text-primary font-secondary items-center text-coconut border rounded-[2px] border-coconut px-5 py-[10px] w-fit"
                            >
                                {loading ? 'Applying...' : 'Apply'}
                                <IconRightArrow className="group-hover:translate-x-[2px] transition-transform duration-300" />
                            </Button>
                        </form>
                    </Form>
                )}
            </div>
        </section>
    )
}

const ContactInput = ({
    name,
    control,
    label,
    placeholder,
    fieldRef,
    formInstance,
    customClass,
    type = 'text',
    textArea = false,
}: {
    name: string
    label?: string
    formInstance: UseFormReturn<ContactFormType>
    fieldRef?: React.RefObject<HTMLInputElement>
    placeholder?: string
    type?: string
    control: any
    textArea?: boolean
    customClass: string
}) => {
    return (
        <div
            className={`${customClass} h-fit ${
                textArea ? 'border-0' : type !== 'file' ? 'pb-2 border-b' : ''
            } border-coconut`}
        >
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="h-fit lg:text-subheading2 text-coconut text-subheading3 font-secondary">
                        {type !== 'file' && (
                            <label className="text-coconut font-normal">
                                {label}
                            </label>
                        )}
                        <FormControl>
                            {type === 'file' ? (
                                <>
                                    <div className="text-coconut font-semibold">
                                        {label}
                                    </div>
                                    <div className="flex mt-2 lg:mt-4 w-full items-center justify-between">
                                        <div className="flex gap-2">
                                            <label
                                                className="transition-colors cursor-pointer duration-300 hover:text-primary hover:bg-coconut text-coconut text-sm font-normal border border-coconut px-5 py-[10px]"
                                                htmlFor={'files'}
                                            >
                                                Choose a file
                                            </label>
                                            <input
                                                type={type}
                                                ref={fieldRef}
                                                id="files"
                                                onChange={(e) => {
                                                    if (
                                                        !e.target.files ||
                                                        e.target.files
                                                            ?.length === 0
                                                    )
                                                        return

                                                    field.onChange(
                                                        e.target.files[0]
                                                    )
                                                }}
                                                accept=".pdf"
                                                className="appearance-none hidden"
                                                placeholder={placeholder}
                                                multiple={false}
                                            />
                                        </div>

                                        <span className="text-coconut flex items-center">
                                            {formInstance.getValues().pitchdeck
                                                ?.name && (
                                                <button
                                                    onClick={() => {
                                                        formInstance.reset({
                                                            ...formInstance.getValues(),
                                                            pitchdeck:
                                                                undefined,
                                                        })
                                                        if (
                                                            fieldRef &&
                                                            fieldRef.current
                                                        )
                                                            fieldRef.current.value =
                                                                ''
                                                    }}
                                                >
                                                    <IconClose
                                                        variant="cross"
                                                        height="40"
                                                        width="40"
                                                        className="text-coconut hover:scale-110 transition-transform duration-300 ease-in-out"
                                                    />
                                                </button>
                                            )}
                                            {formInstance.getValues().pitchdeck
                                                ?.name ?? 'No file choosen'}
                                        </span>
                                    </div>
                                </>
                            ) : textArea ? (
                                <textarea
                                    aria-label="message"
                                    className="border-[0.5px] p-1 outline-none text-coconut mt-4 h-[215px] lg:h-36 bg-[#1A777B] border-coconut resize-none w-full"
                                    placeholder={placeholder}
                                    {...field}
                                />
                            ) : (
                                <Input
                                    type={type}
                                    placeholder={placeholder}
                                    multiple={false}
                                    {...field}
                                />
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
