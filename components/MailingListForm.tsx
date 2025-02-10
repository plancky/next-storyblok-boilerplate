'use client'
import { storyblokEditable, StoryblokComponent } from '@storyblok/react/rsc'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import IconRightArrow from './icons/IconRightArrow'
import { subscribeToNewsletter } from '@/app/mailchimp/actions'
import { useState } from 'react'

export const MailingListForm = ({ blok }: { blok: any }) => {
    const { heading, heading_alignment, description } = blok
    return (
        <section className="" {...storyblokEditable(blok)}>
            <MailingListSection
                heading={heading}
                description={description}
                heading_alignment={heading_alignment ?? 'start'}
            />
        </section>
    )
}

const formSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Invalid Email',
        })
        .email(),
})

export const MailingListSection = ({
    heading,
    description,
    heading_alignment,
}: {
    heading: string
    description: string
    heading_alignment: string
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    })

    const [response, setResponse] = useState<any>({})
    const [loading, setLoading] = useState(false)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        const { data, error } = await subscribeToNewsletter({
            email: values.email,
        })
        setLoading(false)
        setResponse({ data, error })
    }

    return (
        <div className="content-grid relative bg-no-repeat bg-[length:cover] bg-desktop-banner bg-primary text-coconut">
            <div
                className={`py-20 lg:py-[96px] flex flex-col lg:flex-row items-center lg:items-center gap-14 text-center ${
                    loading ? 'loading' : ''
                }`}
            >
                <div
                    className={`flex w-full justify-center lg:justify-${heading_alignment} `}
                >
                    {heading && (
                        <h1
                            className="text-h4 lg:text-h3 lg:max-w-[800px]"
                            dangerouslySetInnerHTML={{
                                __html: heading.replaceAll('\n', '<br />'),
                            }}
                        ></h1>
                    )}
                </div>
                {/* <p className="flex lg:hidden">{description}</p> */}
                <div className="w-full max-w-[513px]">
                    {loading ? (
                        <div>Subscribing...</div>
                    ) : (
                        <>
                            {response?.data && (
                                <div className="font-secondary uppercase">
                                    {!response.data.errors.length ? (
                                        <div className="">
                                            THANKS FOR SUBSCRIBING
                                        </div>
                                    ) : (
                                        <div>Error occured</div>
                                    )}
                                </div>
                            )}
                            {!response?.data && !response?.error && (
                                <div className="w-full flex justify-center">
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                onSubmit
                                            )}
                                            className="w-full max-w-[300px] lg:max-w-[680px]"
                                        >
                                            <ContactInput
                                                customClass="text-coconut"
                                                control={form.control}
                                                name="email"
                                                placeholder="EMAIL"
                                            />
                                        </form>
                                    </Form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export const ContactInput = ({
    name,
    control,
    label,
    placeholder,
    customClass,
    textArea = false,
}: {
    name: string
    label?: string
    placeholder?: string
    control: any
    textArea?: boolean
    customClass: string
}) => {
    return (
        <div className={`${customClass} flex flex-col h-fit`}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className=" text-coconut flex-1 font-secondary">
                        <label className="text-coconut">{label}</label>
                        <FormControl>
                            <Input placeholder={placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="w-full h-[1px] bg-coconut mt-3 mb-2"></div>
            <button
                className="flex gap-2 items-center justify-end !font-semibold font-secondary group"
                type="submit"
            >
                SUBSCRIBE
                <IconRightArrow
                    width="17"
                    height="12"
                    className="group-hover:translate-x-[2px] transition-transform duration-300"
                />
            </button>
        </div>
    )
}
