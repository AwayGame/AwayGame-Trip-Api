const helpers = require('../helpers/helpers')
const TripHelper = require('../helpers/trip')
const TripStubHelper = require('../helpers/tripStub')
const GoogleHelper = require('../helpers/google')
const YelpHelper = require('../helpers/yelp')
const TicketMasterHelper = require('../helpers/ticketmaster')
const moment = require('moment')
const _ = require('underscore')

let exampleTrip = {
    "itineraries": [
        {
            "activities": [
                {
                    "date": "2018-09-05",
                    "name": "Old Fashion Hot Dogs",
                    "category": "food",
                    "timeframe": "breakfast",
                    "startTime": "09:00 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJWSiU3j_wMIgRpcQwsUpwiWE",
                    "phone": "(216) 631-4460",
                    "address": "4008 Lorain Ave, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.48056,
                        "long": -81.713416
                    },
                    "website": "https://www.facebook.com/Chilicheesedogs/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 10:00 AM – 1:00 AM",
                            "Tuesday: 10:00 AM – 1:00 AM",
                            "Wednesday: 10:00 AM – 1:00 AM",
                            "Thursday: 10:00 AM – 1:00 AM",
                            "Friday: 10:00 AM – 3:00 AM",
                            "Saturday: 10:00 AM – 12:00 AM",
                            "Sunday: 12:00 – 5:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1200"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "0100"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "0100"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "0100"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "0100"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "0300"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 0,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1000"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Richard Ciammaichella",
                            "author_url": "https://www.google.com/maps/contrib/101532379191371536221/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-yxOstBpTPS8/AAAAAAAAAAI/AAAAAAAAUO4/rVIJzTZS54I/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a week ago",
                            "text": "We thoroughly enjoyed our dogs and chat with the owner/cook. Quick, tasty dogs. Wholesome, real Cleveland attitude and conversation.  For a fair price. I call it \"Real\" and suggest you try it. Maybe not gourmet menu, but this is a 5 star hot dog shop.",
                            "time": 1528248754
                        },
                        {
                            "author_name": "Ronald M. Hubbard",
                            "author_url": "https://www.google.com/maps/contrib/101524729303351076791/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-0nrIvxNPT8U/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2Ut0LLNwvj_LugYmLfrEAPMkrjOw/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "4 weeks ago",
                            "text": "Mo's Hot Dog Inn, has Cleveland, Ohio History, its 90 years old new Owner has had it for 30 years, same hot dogs n foods chili! Same recipe handed down from Original Owner! Small does constant business an food is the same as 90 years ago! Not wheelchair accessible, take out or wait when really busy! When it's really good why change, Mo's Hot Dog Inn is a legend! Hot Dog  Inns have come an gone! Mo's however is a true taste of History! Great 5 stars!",
                            "time": 1526591605
                        },
                        {
                            "author_name": "Wesley Schulze",
                            "author_url": "https://www.google.com/maps/contrib/108671661917332916753/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-wpNhH8jtsC0/AAAAAAAAAAI/AAAAAAAAEYw/aDR-mvXP480/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "in the last week",
                            "text": "Cool mom & pop hot dog joint. The owners are super chill and great to talk to. The food is alright. I mean, it's a place to get a hot dog and Coke.",
                            "time": 1528514737
                        },
                        {
                            "author_name": "Drew Hoffman",
                            "author_url": "https://www.google.com/maps/contrib/108339947447144466572/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-ZBI1LbgbJNw/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq26YgGw_KU6zuLv4ore3D0TOXnIQw/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "4 months ago",
                            "text": "I'm only visiting from Jersey and my local hot dog joint just closed after 60 years.  Glad to see there are still pieces of Americana left standing with this delicious Old Fashioned Hot Dog place. 3 dogs for $5 is a great deal and the staff is super friendly.  Hope this place stays around for many years and I'm able to visit again one day.",
                            "time": 1518268417
                        },
                        {
                            "author_name": "Nik Popa",
                            "author_url": "https://www.google.com/maps/contrib/106447873972616250739/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-RAyjjzjV0lo/AAAAAAAAAAI/AAAAAAAAKFQ/P2-h3QcDrh8/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a week ago",
                            "text": "Step back into the past and enjoy a bite at the counter, conversational people on both sides of the counter. Remember to bring cash, I believe they don't take cards..",
                            "time": 1528221916
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5w01kI1goDFgvrUuTkeTrvkRjOiLAtAm8DtoLv05dTLtonNWCiru3FaUIaouKMPBtMSs6-_LRCp9NJOXo0I4HHxk7EzodQL012BCGIyfu95XY12soD9oWqAkDrsfMu7HEhC5q4Hggkvk-3x3k6PBBgasGhS7p3KVyuhvrDArj3CQmU0ewlvNgQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7NUk7BTMR9BL9vkm6AbX4GB6eB9V6cFeWqkcXLWjaEOiCkhUUrzdeanVFQoudSFar5YlBPVj3ZMOFg_5wbJB7225129qCcqYNt70r0XxSZTAzurRSt7q5B5xcr06U_gBEhC3yAKNrKN-1QDvlLsL-aaBGhTgIUGV0qwcvmc7s2Ntrkv6eTJBJg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUy0SrBpnFgStzBv8BQ76uqtdONgOAiFBCyxW-f41X5AUkpwXJyIytu5f3LNQSDDHrd_8CQNdzciAa5mbqMB9RNAnd-7t8kN1fYWopRYMXJmYzz4nT5IKg8L8vTcuWGRBEhD4DAiTsQsQxg0OMLfeqjMPGhRV726w00MSDbV5M2T_Fl1uaM9Z_A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAk_nJdEND7Yytfe7XqrrBqSip2c1_VZLmzMtOjr53GLzr2RDwh22zsb7_Nvr0Wzz38jfKqhTTuWYH7G1UaX4j59I8Sn2ATcFnju-6lK7NzxJunNOvaNWGQUW_IIUeMmo2EhAAXOoPKl1D1CSWZ3VSRmmMGhQARg_8g_zVf-3IOFlwpwRZujJTMw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAxyRJsadumKIvrWyzVc46pi0ihyOkJodUYR0JNlPyQUAaiWcn_HRfAUyrH34KC_Xp9rbELma1T3cUzumsQfU3qEO2zrsFeZ_WO3BZ4n6RGmA2xNPSvDm751b7wbE02Xo5EhD4TBq0I1lWWPiaurCHUw6DGhQtstdvGYpS6XzO7vqwTjFTemelaw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEkPaaRBEIT3zWwItdL1vHMdQyoQjjcF9kFhOhhZ7nr0ehYFArn_MXAiqT1RqsmfnlMSfnn_y0jcrLfjbn8cxSsfRvR7FX4DwFxUhQ23D8LkDpuKXukt3mO16Kic4_v7vEhBI_y3tPo3yVVkHsVOHhG7kGhRtfIWS_jUXoMS2izqc6gZU1KQWIA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAga28_5nrnb28HyohUBIdZyxjOkt3F71knEhd2xm1xqJEh40GKI0rFfAjKTSqHnV-Pxekv4xNNO3Sz__cuzjVsUtzetS_zR0JDN-65xn5riZDOsq8Y7-3WRl6CIGICzWFEhCtn5xjvezfvgy9sx5Q0gGpGhTmtJvyE3WldkL10pIC1rK8XZlsOQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADjXhqcxXJ8K60BD4_afaVkQ_OZ9Xy3wu272ew16M3VKsiYZl0SUYn-4d5vwnb6yJuMRohBUCk3Z4p2dQkzfbX9dOW5h_NB94BZ-f68SQP2nPgEyXL3TOtr6NMCuDz1z7EhCUMycB32FWEO_hGBkwOfspGhRSjpdv6zJ1-WSDFrjGaOe9RvY97Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAyx2u7C79ocUx3Z28XxbUrulVDKSDI097agr6wueI__dr-ce2ojVJpWwIHRaHDjJVgcAWZfsk9Vv2PUXyrBdvUm2GRCxlSFp-yCxxYGeWWm5-7mSQZf0c0htsGOZOiZlWEhAniaI6Ug9VGjT05AhyyL41GhQY8wiIEWhYP547rEP-HAtRNC4QwA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXGoKfK7jpFQuJ0uCd8yjvmv79txtp0UGpqHBBIyi_UAGis2J9KIsqNEgLOFvJ03G7chiUy85XA9eZ3-39z_yLLLNeG4FauWAmWauAgaYpYhLOuhZwjsAjLRooLNvQgnzEhCa6jbK0QairAsQzbXeXEizGhReObItBBkb0HJ35kbKJ-hfX994ig&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "subcategory": "fastFood",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.48056,-81.713416&markers=color:0x82CA75|41.48056,-81.713416&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-05",
                            "name": "Subway Restaurants",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJRxHW7336MIgRsG8HcVBvVxk",
                            "phone": "(216) 241-7827",
                            "address": "1240 Huron Rd E, Cleveland, OH 44115, USA",
                            "location": {
                                "lat": 41.5003192,
                                "long": -81.68224699999999
                            },
                            "website": "http://order.subway.com/Stores/Redirect.aspx?s=7873&sa=0&f=r&utm_source=google&utm_medium=local&utm_term=0&utm_content=7873&utm_campaign=fwh-local-remote-order&cid=0:0:0:0:0:0&segment_code=0",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 8:00 AM – 10:00 PM",
                                    "Tuesday: 8:00 AM – 10:00 PM",
                                    "Wednesday: 8:00 AM – 10:00 PM",
                                    "Thursday: 8:00 AM – 10:00 PM",
                                    "Friday: 8:00 AM – 10:00 PM",
                                    "Saturday: 9:00 AM – 10:00 PM",
                                    "Sunday: 9:00 AM – 8:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0900"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Dewin Starr",
                                    "author_url": "https://www.google.com/maps/contrib/101026833588168437299/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-aRxZnsbKWa4/AAAAAAAAAAI/AAAAAAAAAxI/MebCTzRaMew/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "A very nice and convenient location for most people.  Very people friendly service.  We love eating here. Everything is always fresh.",
                                    "time": 1521205235
                                },
                                {
                                    "author_name": "Gabriella Bryant",
                                    "author_url": "https://www.google.com/maps/contrib/115775560902439201673/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-4cuw8ISyt_E/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2Grl3ykZ2G1Tnovc4yGIAH3dtWHQ/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "2 months ago",
                                    "text": "This Subway is around the corner from my job but instead of going to this one, i walk almost a mile to another location because service is consistently so bad. Employees have bad attitudes, dont smile, are aggressive and whilst eating in once, i witnessed the most disgusting half ass cleaning job on the floors and tables. Employees also consistently dont know how to make the sandwhiches. Forgetting 1 of the only 3 meats required for your sandwhich and things like that. Bread also is consistently stale, ripping apart at the fold so that none of your toppings remain on the \"sandwhich\". Ive given this location multiple opportunities to redeem themselves but everytime i leave even more pissed than before.",
                                    "time": 1523799859
                                },
                                {
                                    "author_name": "ravi kiran",
                                    "author_url": "https://www.google.com/maps/contrib/110011656876606624198/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-Aw7YsZc0GZc/AAAAAAAAAAI/AAAAAAAAEqA/KE-ec-xvOLA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "I came at 9:45 pm... , The guy made my day... He was very friendly... Made sub tastes great",
                                    "time": 1520566997
                                },
                                {
                                    "author_name": "Theresa !!",
                                    "author_url": "https://www.google.com/maps/contrib/108800080095910197854/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-CBh9amrP8-I/AAAAAAAAAAI/AAAAAAAAExU/92qNcQhyMCo/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a month ago",
                                    "text": "This is my favorite Subway :) it's tucked away in playhouse square.",
                                    "time": 1525564764
                                },
                                {
                                    "author_name": "David Vereb",
                                    "author_url": "https://www.google.com/maps/contrib/117384162965955410689/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-K9R9XsZJ2oI/AAAAAAAAAAI/AAAAAAAAYZw/iDOihkxSEPo/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "6 months ago",
                                    "text": "Understaffed, but the food was still great and the staff was still very friendly!",
                                    "time": 1512452818
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAk6clJMFq7tm3upqsKZxKGRIXkXSvj4-to4lMm_ULvWTdLU_DylkWY1zN8KhbpqpBvFnOX01fpJVGfYJpmorGU0fpALog58qvECOomJdQuvYXTRKZ8AOSxhHpYZe3xnT4EhB6wHfA1MDqk87n-WQXhxFnGhTNYuu1s-ZqikapFNtMs86VNqYmIA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAs_6tO-3u3xwWT9zh6QPcI0GrNUqGRvZbfxZortMePvmSFdCCdD4FSMgy6rLil7SnUlACwR3T5Mt-mk4kb2dl1s2b000qJqGQxg-8GoW9oCG6IImsi83wm6IgF5nx62hMEhC3nrHlldJdVzYfAsfa00fwGhQB47i6z0oL-ErfHQnZ6_sN98zMlQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAqcNHmh11sq-bKX2hn8MZllrRaNtm4eDawmTkc5I0gPDYb8qTyjn2OgYErr2eSf_PZHtkCl_NwgPy4PonfD6ru8NqqR9xxLSI39ZBoIch49NCzIG7gpmr1hML1CaPLf2XEhDkXACr-nIzri7Ir37eymd2GhRNtHe71S5zC_bsLUKetRUQOhFGhQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJa26svYZNNM6h_1AI-_Z7QJhp7DjWhXnaT_nlQKs-NWgsY5LA8z5K_Lj0vf4z8_d_I6KSos894VIeTmDsYJBsWXKjyxlLBBH2Yb-Abv6oLwyVExGbzu8Dpj72LVDGavtEhCLE7fA2igi8gt8nPjAuyP3GhSKLymmQp3UiILpbupeJMzxp3omGQ&maxwidth=400"
                            ],
                            "price": 1,
                            "rating": 3.9,
                            "category": "food",
                            "subcategory": "fastFood",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5003192,-81.68224699999999&markers=color:0x82CA75|41.5003192,-81.68224699999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-05",
                            "name": "Five Guys",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJS8QCUVXlMIgRDjnq16Glatk",
                            "phone": "(216) 398-2222",
                            "address": "3273 Steelyard Dr, Cleveland, OH 44109, USA",
                            "location": {
                                "lat": 41.464495,
                                "long": -81.687142
                            },
                            "website": "http://fiveguys.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 11:00 AM – 10:00 PM",
                                    "Tuesday: 11:00 AM – 10:00 PM",
                                    "Wednesday: 11:00 AM – 10:00 PM",
                                    "Thursday: 11:00 AM – 10:00 PM",
                                    "Friday: 11:00 AM – 10:00 PM",
                                    "Saturday: 11:00 AM – 10:00 PM",
                                    "Sunday: 11:00 AM – 10:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1100"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Henry Wade",
                                    "author_url": "https://www.google.com/maps/contrib/115897617943915479017/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-SBQig3EFBQY/AAAAAAAAAAI/AAAAAAAAGYM/-gSCwRQD9MA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 weeks ago",
                                    "text": "Pretty good place. Burgers are really good. Nice clean place too. The details in the way that the taller chairs are place add to the feel of the place.",
                                    "time": 1527012326
                                },
                                {
                                    "author_name": "Christina Moore",
                                    "author_url": "https://www.google.com/maps/contrib/112891709376663179507/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-yE1t75kdIY4/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq107MzkSc5UZT0lAFD1gARmxK7Lnw/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "Very clean, friendly staff. Too badge people seem to forget it's here. It even has a nice outside eating area.",
                                    "time": 1528123282
                                },
                                {
                                    "author_name": "Joann Sledz",
                                    "author_url": "https://www.google.com/maps/contrib/118064945430931857517/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-PqRH_47NpvA/AAAAAAAAAAI/AAAAAAAALdw/RKDs7Csrka0/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Great service\nstaff friendly, smiling\nPleasant atmosphere when eating inside\nVery clean\nFood is delicious \nI highly recommend this Five Guys.",
                                    "time": 1526226673
                                },
                                {
                                    "author_name": "Anna Rence",
                                    "author_url": "https://www.google.com/maps/contrib/101872097573603167703/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-1ZcomrIyPPE/AAAAAAAAAAI/AAAAAAAAAC8/XvV7C45XrQQ/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 weeks ago",
                                    "text": "Great service, very patient and helpful. My BLT was exactly how I asked for it, with extra crispy bacon!",
                                    "time": 1527596284
                                },
                                {
                                    "author_name": "Adam Metzner",
                                    "author_url": "https://www.google.com/maps/contrib/100674281178917992806/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-Qwkk0VT7sBY/AAAAAAAAAAI/AAAAAAABHz0/mr9O7oV9e6M/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "Burgers and fries good that every once in a while you just need it.",
                                    "time": 1528828474
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAsXPIAwhvtVVyaV9SqjMaOErtf96na-ZcA4VrgwS5YA6QFY0PrLw7arnqUjJRQcIKhR1ncttQtDDz_MyQ-jTJQVGVGdzru1QLP6Vf3xkaeMQGIQOove33ZF8lITnb7NBMEhD9tUJQD31nnDSpxyZ0EDPCGhQVrhm9U4XQltfnH8QrX_vvmT-OCA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANTfyqoV7vY_bFurkWwacyzpv7Q4_MaUmcR5xeRu7pYy_PmNayLagQ8omcl4y4jmTb6K_iAjwFiHNLnCvzUtGtSzzVCt2gen6T0SVK6AiA5AaTyzPYRd2hIdGUy5lcpc6EhA8e5DeLmEEc3Z9iCDD8W9OGhSdX563uxC0lduOyiUI3qN4JyTL1g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGD4XCyDi8W-WyKyuYoYAHtujxJxpW6oMA7sc5I8tV_YbA9_7qKahj86Cio2pOP3tFp2UZ4LerB08sHtZSdi2B00YKqVHTJqTe-u7muCquk7etA31EK2RfaN-zaBH_VinEhDPAmIbbPqpEdWO70Ed7rzBGhQ2zTIOHNAqGukwLrqJLKt13Dy06Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcoTkrUb7UV9ZYwU-INFAbOuTT93W-FxDJd1mjO8IvoOgxEoSBNMnR-O9uBLVb1AGJe8tCYy04TvB6r18fTlImvy1_ddTu38M62UUFurERF_V3lN5_OkbxA214e4wlrMdEhDTUtT_jd_hk0bbwFgOf3u6GhSMLf409z0Qw7EXcuMPKxnp9CtsWQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANjmstc1MzJVSPiuSCrZAHvW_zTy3Sunh-w9UXnREoLsAmH6uvBnoKqrw94QstSsqDrpRBEFC3310a1Ng6-Oirv0BlGh7KWteTG3gsd7VYptRfJZ3ZG49TC6W6v_Q-WZnEhBuYAZdxg4j7E_cywusiQDKGhS-UO7lfbAiBao_-sYkZLcFCnvouA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAsMxc3Yu8tdr_4hYYYXkpulNMbS3xAqco-xc75ypcQhSQdZnzL2YhjDmx03xgIlUI8c13rmkbzZFUv1VwU6-SScco7GIIKIr3wjxPuTBrCwpKnlwCj8pLcSbgFu1CJRjsEhAucnW3Hm5GmiCvZXu9MYFIGhR-MCwl7uEEhPm3jSDcZyI2Rn2AMA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAhAvmwShA4t9-VzZyIsXzGs6wnCiaP-XH1poP-g-PBt84hcshL9aCIr9vWUmplDeLFEepNIwaI09JwAcHqiW9jSgkOg3lu9T-WP_j_1RhcviFWOFzn8FPgDctx3Z4jD0_EhCxwebv7g7e4SgUSLW0KJ-0GhRDXyX8i7gxNs5spi8LtFKatoSKXw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcj6gFODwmRXfNve994gjRvNqu7oQZ2erQyGDyKuqrDuug0L_zI6epqQFjX87yGchhpAxCuy5PwZ0AuUfitKmI6-f5Z99Gt6u3E6ZBvTcZIxIv31i_5Eg88vfWZVgkOQBEhAtLYZhEtPL3I4CEbIxNyiMGhTtFRXEO8RG6AZIf1s4xSN5rxA_zQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAhty23SWJSTkQmmU8YaWTejgIghHku1Z9Fh7ORMI6DL7KhtZ7UGFaWoTUqWgmTTNCiWRObqsNxU0lGjoIBPTYM1dm4C3r9VXhr9fE490pzWq3i3YlGoRoyQHvgfnGP60uEhDuHGaK8_l5jBIP06n2V_7kGhTimL2K4z6Gxtw0CB7XF4iZoQbMiw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA03vaC1HpQ1Y5xXM86x9Rhrj8OfrUN3j7T5QVV6_p1lNDtPbIGzW41l_t2WRSCqWUS45erVcD_CZlT71i1F4pQLrpO9psLSjz4XvaEsvT1gfnQh6FSlMrTyBLdNwtGObWEhBW2OjZjnsF4Xx2oyXjPYNoGhSmnW2q8rOpmvJqipSbkRh3JZz9lA&maxwidth=400"
                            ],
                            "price": 2,
                            "rating": 4.4,
                            "category": "food",
                            "subcategory": "fastFood",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.464495,-81.687142&markers=color:0x82CA75|41.464495,-81.687142&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-05",
                    "name": "Ukrainian Museum-Archives",
                    "category": "day",
                    "additionalTime": 15,
                    "startTime": "09:30 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJpVk_HKD6MIgRPM0-BjaE0lk",
                    "phone": "(216) 781-4329",
                    "address": "1202 Kenilworth Ave, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.480061,
                        "long": -81.690214
                    },
                    "website": "http://www.umacleveland.org/",
                    "hours": {
                        "formattedHours": [
                            "Monday: Closed",
                            "Tuesday: 10:00 AM – 3:00 PM",
                            "Wednesday: 10:00 AM – 3:00 PM",
                            "Thursday: 10:00 AM – 3:00 PM",
                            "Friday: 10:00 AM – 3:00 PM",
                            "Saturday: 10:00 AM – 3:00 PM",
                            "Sunday: Closed"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1500"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1500"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "1500"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1500"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1500"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1000"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "michele king",
                            "author_url": "https://www.google.com/maps/contrib/115135538593179039996/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-d4eSyPoOaVI/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3EOplDJA3l7tzDv2a_LQO2YLW6jQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "8 months ago",
                            "text": "Totally different from other sources.",
                            "time": 1505746671
                        },
                        {
                            "author_name": "Zenon Chaikovsky",
                            "author_url": "https://www.google.com/maps/contrib/100950458801377831546/reviews",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-MiWXC0pRhZE/AAAAAAAAAAI/AAAAAAAAWh0/eGz_-suI3Jk/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a month ago",
                            "text": "",
                            "time": 1525604039
                        },
                        {
                            "author_name": "Anna Melnik",
                            "author_url": "https://www.google.com/maps/contrib/101288404606576260626/reviews",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-_Tm1_uQsDcA/AAAAAAAAAAI/AAAAAAAAAj8/ZZnU-zN1wsE/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a year ago",
                            "text": "",
                            "time": 1492798512
                        },
                        {
                            "author_name": "Андрій Ребрик",
                            "author_url": "https://www.google.com/maps/contrib/110594684917241224823/reviews",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-2S3qKajT7mM/AAAAAAAAAAI/AAAAAAAAdxI/i65z90jil5Q/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "10 months ago",
                            "text": "",
                            "time": 1501354322
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAeJYcaqKFD3ErwhPofxdjD6BdLoaCzjz_loKdljLW6y8oiRrIOFX4DzuFoTBW7zIv7LmmmiHlCeCUhFI5xQRXz9nN3m8h6zzAew370tYTFwSzEaqE5B0lvDrysuC3HaLeEhCTqKdYAX2oaxIMAKSA5jq3GhQSqvVSVa47QREQadh5rCphQKZhPg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9FO7DugXnQPFI9Y7RGR3ISBGo_sS7l_NdN3ytoyiNfbTeO1KzcNEgjvdoS1DhpmwFCB_PJi-Wz-KXRrzydDxIV5u7_Rpwp4uczXdMFfQMt_PU5AmBP8JfzXk5d7Zvf3YEhA0CgURSxIPDPHA093DVeVYGhR4COjFtyb0MVYTrgv8Gb2weTkAEQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlmwgWzlKubBw_KeMnSj8VsXyYluzKIvLRqZv-44dhyhv2BGpxm0iYs7FgVsevhEvG-n-IUwmPp8tnsOuctcW0HxoPEBrMsaHm3qjsWVReHKyNOdABXr1iR58MEjRh_gREhDwoJNcbo8ARMC9M1RzsXQ1GhQ_DVvl6s1W3kZNrcXSBersS2Isrw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAHezQ360TWiTDStSjXkFaku8lfN36D_CBPgfSJQYi9Y2ML4WO-ZzbGtvOM6fnVjktmhKSVMSn7EtkRdomO8N65fAHWShPohjCls-oHox1jLbXvBtCdW-SdygbuWzPzkhlEhDeLGOCupBxcxJ1NO_pkgM2GhRGwdEIsiwcwN0-0TuCivL_b4BhvA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAw8v2IFPKWhu2JSp3DcAbQyEeb3oIJLky2x4DWUvvBQqTrh6WsLsLUNdh1xPDbgHPxV3GQX_OgwMcppjyfFFQ5P75P07ziNZAr__sg-m_zXzJ628VGSjKArYounIV3H0DEhBfU9bJuW44of4yBVYwjwWbGhSfT1ZuB_p2GDnQYRAOa1NBXV7ZEg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmiKI9JCHDWHVuIo7EEx6ENKc56kvMoNGGoqTsHa4ZJqNIDgGJIRDH9gFDFDJ-_DE11PKUnTKWl-ht4QNk3Yk-Rrw6cGyQXHAp7jq7C8ksx_bYGg7vzedfnklyGD2jmzOEhCeutvSoDgkhj07qU4AJz1OGhTVX1S1fcD36yxxy3IzXKqxwVCbZw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAE2QoYzKjoZizv6r66yDwsCRuvPiUxbcpnJXkWVsnw_Njdl5l2qlLIG6JcuxNFvQAtgbBzR42COypsuj1CQuW2UHffh0k3ohtqis6NL6MkSxsAXfCv7mvFJQ-TJAYiKkFEhCmc_SnVL0aU_urZWdz1ARVGhSDaqBJclB2Xt6lpuC5lQBrukn2eQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAKefQNj4SiaVb5_KjUvsgsBIuz7JI77UD7YFT2NzGn3NJBzKmG8wOCsjP7XgF1195fGhuWmC-_vaWMdT_e9jsz_KrgJoSD_iKUAspmJa0K8JATMKXudgfAM4mrVXuJYozEhBLnjbbtaPU_t7ADt0XtFOvGhTUkA2zK2roBUX5iqCjNbddHKLY1w&maxwidth=400"
                    ],
                    "rating": 5,
                    "subcategory": "museums",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.480061,-81.690214&markers=color:0x82CA75|41.480061,-81.690214&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-05",
                            "name": "Transformer Station",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJYbIFrGnwMIgReSG74zjySCw",
                            "phone": "(216) 938-5429",
                            "address": "1460 W 29th St, Cleveland, OH 44113, USA",
                            "location": {
                                "lat": 41.4889303,
                                "long": -81.7106867
                            },
                            "website": "http://transformerstation.org/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: Closed",
                                    "Tuesday: Closed",
                                    "Wednesday: 11:00 AM – 5:00 PM",
                                    "Thursday: 11:00 AM – 8:00 PM",
                                    "Friday: 11:00 AM – 5:00 PM",
                                    "Saturday: 11:00 AM – 5:00 PM",
                                    "Sunday: 11:00 AM – 5:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1100"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Emily G",
                                    "author_url": "https://www.google.com/maps/contrib/115937439875604052700/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-aU3y4PvqNnw/AAAAAAAAAAI/AAAAAAAABRo/dPzzLDm3hBA/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "2 months ago",
                                    "text": "Free art museum with high-quality, well-curated exhibits that rotate frequently. Always quiet, off the beaten track, as it were.",
                                    "time": 1523365308
                                },
                                {
                                    "author_name": "anne-marie Petros",
                                    "author_url": "https://www.google.com/maps/contrib/109638536575050068223/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-68i-bwa7PK0/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0qz941I1upBd3fWNP4T1fPMtVAeA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "4 months ago",
                                    "text": "Fabulous selection of modern art in a breathlessly lovely space, the whole affiliated with the world class  Cleveland Museum of Art!\nKudos to Fred Bidwell and his vision!",
                                    "time": 1516565244
                                },
                                {
                                    "author_name": "Tom F.",
                                    "author_url": "https://www.google.com/maps/contrib/109065173903767477475/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-2wW2AC5Lyxk/AAAAAAAAAAI/AAAAAAAAAbI/EewPk9IotP0/s128-c0x00000000-cc-rp-mo-ba6/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "9 months ago",
                                    "text": " Not much art to see here, and what there was didn't really blow me away. In the up side, my understanding is that exhibits rotate through here, so it is constantly changing offerings.  That's pretty cool, especially given the connection to Cleveland's MoMA!",
                                    "time": 1504868563
                                },
                                {
                                    "author_name": "m patn",
                                    "author_url": "https://www.google.com/maps/contrib/114573194517392164484/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-dYQeUvuhwMk/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2oWPKhiFsfDVxWalIQ88sZ2fY3ZA/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "There's summer concerts are awesome and free",
                                    "time": 1521667763
                                },
                                {
                                    "author_name": "Timothy Robson",
                                    "author_url": "https://www.google.com/maps/contrib/108146833126730363389/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-42ROjvUA4LE/AAAAAAAAAAI/AAAAAAAADgk/1WJQzpV6Ad4/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "11 months ago",
                                    "text": "The most interesting small gallery, made in a renovated electrical substation originally meant to power streetcars, in a recently gentrified Hingetown area of near west side Cleveland. It's a cooperative venture between two private collectors and the Cleveland Museum of Art. There are also occasional concerts in the galleries.",
                                    "time": 1499169406
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjd2J3p_74obHASNwsObPhyLm1kc68R8lXJ4Kwoqb8HAPkF4BggWIvguzDCs9upJTS0bp1-OCtWdDW-Q1krgO6Ma_El5udPkKLTgDZ6APA5CMtxSRnLyGqZALxLRogOmQEhAaHlo8APozXiUA1MPIl8UPGhR5TT0rAwxaPFwPu_Bl9nm0YPfDyg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAp8EH_Jl2ePP7PmjoChhNlr9dl7QjIUrEue62CblWpWZ7FSVMcK1rFepH8UpqkBgiwBfFDw5wixRYyGNjVHAvNq5Qh20k-Vb9aTPqyWayjQTSYKTYYh41rK6Gbp0VFb2wEhCNshuCauqOQC7TVq4hdjIsGhTCbyWFjP73eQv_XtpO6NEHpdfrgA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAunSzff-EUdQZidpJYqFEdw78K-lQgUWW8WX_7-Vw24TOdvHdrZ469ZPy0epAobUfRmbT4-iYMrrAOnLs-FaYy7RTEiNwMn1XEgvWDZhLWb54RohXRyQw67Qhx0aBN-_KEhB5tPMSNEQD3OAph6R3BHPrGhSMgh7zvXXpbS5rrjwNCHriUfoXRg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4hy-GFAu_jdgu5sOgrrjF-Ysdl3xxNnglJ_0M2QN3U7wBpMSvXoEVnzZjJQ9Y5QK-bmmCJ5t4MqngoijQNqGjOpQZJZoBU3v8yZ0VSg25KofzqRqxJlKn1kJbXAZ8cZuEhABYA7ejiVB2XMIIgHVzN8eGhTCSTlYy7FFqaKc_l9wp-oD8r2R6A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9NzwEkjVugn2jduQUtkOeZUZYxdvMPe_uuuYFz27_GsNViFewGx1qe4qD_mpC8J8mmZORojit6LMilp02NRcS50kIV4OD3CbhJl5ohwUVMhmMq7h6zAI3z61Zqhu8rzFEhDDG3ohusR_17OkUSaqbrWrGhSVhhK61URsJZ0jmCaS0a43t4bnAw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAvRb1Y2A_0oHV8sROhniRzOkkvNQxalyzEbLcj_N_jpBLyYpif32LlI3JpvX_yEvXeKQw7pKXWunfffv-hPdIJt4K8a6UFETh6Vn-IC3tq82PczT0owy2IDO1qpKcmf0LEhA8TChCj4Xidy3YDVVVnwrfGhT2RQj4GXP8eXbHWEM98tzAyzOicw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA8mQTNAej-7aXfXbGUewCgW7T5dI6JOWVPbXVAPXPBYekG833IrcB3uFJDr3tx6jlH-wCAh5PD7-N8H7SXu1vNI5KEUgacVvfP7fNX1lrzA--6-evuT0b-uCZeOuQatSsEhC-FNoXkzh3QoCqE_SUVf8nGhQLqiC39Yzmg_ubeD5zhQZ1PHnJyQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYNC9Fep_f6qm15jaVLYo5OqGWuFIxC9bzXu1KgUMLe0FPsr7i9UwtCsRwayLOm7wo0Z0xrpau_JTqGCcvJJnRwp5m-ytoe0F-V_qbsTfmUkt_jzR_DdLwS7OWx9lrz9dEhA-hj-76XKMqHMwq1O7qnSoGhRev4HAY-Z0vYtK3bcAQ8F4eizg6w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWVt_Uajs2T4KHObKss5HHoq4-6fWClzXDcOchwDq041z47FkvQpyR1JPV6NcEcaWmD0nr8Balxmi1IfkSIXMDfhGsuzHs-y3KoXlDlMELGgL1BTLwWmbWVhfbf5NSPu5EhBe0p2R4GBJyBr6wISB42vGGhT8zpYH1tyGurFaJr3W3neQhSLBpQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlkEYDMWJs5nkvpv2vXS0HfK601r0zf07EjJdpxQ_g4xkgxhmx6XwM4o7x93Ag2reQljlAaEBajVzTgMbFYiUGrk5sWKgvR9v45zIxTSaPDJVaz5pQyIDzjwmJYDvnz7hEhCJfgSPPm8q94ICQ3YF4jv1GhTY0VifUKiga8Dxf8Kjff5YhuhkTA&maxwidth=400"
                            ],
                            "rating": 4.7,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4889303,-81.7106867&markers=color:0x82CA75|41.4889303,-81.7106867&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-05",
                            "name": "Dunham Tavern Museum",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJU75xyq37MIgRNmaaFwdVvKo",
                            "phone": "(216) 431-1060",
                            "address": "6709 Euclid Ave, Cleveland, OH 44103, USA",
                            "location": {
                                "lat": 41.505211,
                                "long": -81.643191
                            },
                            "website": "http://dunhamtavern.org/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: Closed",
                                    "Tuesday: Closed",
                                    "Wednesday: 1:00 – 4:00 PM",
                                    "Thursday: Closed",
                                    "Friday: Closed",
                                    "Saturday: Closed",
                                    "Sunday: 1:00 – 4:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1600"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1300"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1600"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1300"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Peter Hedman",
                                    "author_url": "https://www.google.com/maps/contrib/114163233447845585501/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-PFhm3jz0dN8/AAAAAAAAAAI/AAAAAAAAa0k/w8ZLeo6kATg/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a year ago",
                                    "text": "Dunham Tavern is the \"oldest building in Cleveland in that is at it's original location\". The museum today is a collection of period artifacts that give you a sense of what daily life for 1836 tavern-keepers might have been like. See wooden boot-pullers, pewter dishware (contains lead!), tin coffee roasting machines, lead-lined tea boxes, rough kitchen tables, a wooden bar in the taproom, a musket and the wall, and (my favorite part) maps and engravings of the Cleveland-of-the-past.\n\nThere are only three things in the museum that were owned by the Dunhams themselves (needlepoints made by their daughters and a dresser) and several period artifacts that were not likely used by the Dunhams (flax spinning equipment).\n\nMy tour guide made all of the old things come alive! This building has stood by as Cleveland moved through many eras --- it is an interesting vantage point from which to think about Cleveland and American history.\n\nDunham Tavern is worth a visit if you can stop by during one of its elusive open times. At other times you can explore the gardens or stop by the farm stand to buy food grown on the grounds.",
                                    "time": 1467901526
                                },
                                {
                                    "author_name": "wilson taylor",
                                    "author_url": "https://www.google.com/maps/contrib/118439125139115028525/reviews",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-YnQP16gD4GM/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq26XyoseUI3PyplR6XF2m3gRZqkKA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 weeks ago",
                                    "text": "",
                                    "time": 1527526821
                                },
                                {
                                    "author_name": "David Scruggs",
                                    "author_url": "https://www.google.com/maps/contrib/100740175891029910415/reviews",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-r95j2vlrtPM/AAAAAAAAAAI/AAAAAAAAAZM/K4UInWd5VL0/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a year ago",
                                    "text": "",
                                    "time": 1496385334
                                },
                                {
                                    "author_name": "Sam Shroyer",
                                    "author_url": "https://www.google.com/maps/contrib/114465257506422376118/reviews",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-UIgzW73vqWA/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3F4r-9ecgzlqqmXOKk4Nf4PvfywQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a year ago",
                                    "text": "",
                                    "time": 1468016955
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArZTiMRO_L2rW5da5RMElMyIeZfFNYjiXV210N0UFZ5Y4YqTDUTsItHPmcly4P649q5WUCuQlQz_Kn8_NNRXCIJ1lcwDYtBXMCym7K1Vl4Lq3sZ9fM52QLeS48zIRkuMgEhCTT7qkPDhG23lYKNh7xfXGGhRdtHi64IeOmx_Ff_s9CU4XtHXjaQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjsYFb1a-knDSNQErtDRVC0f-AZrgSJZuqc1KMsY-VTnnHBPLK4cqjA7ydkGUsb8RuYuzl06NkppbGWRM3lAloBDHD9OD-lAwmmpLBPtaUEjzKslpvB6_99cdiCKISLuTEhBfiQ8i-XDZX7mtMwAB6FoWGhRRcknmU-qVAPXIsDx_nMsnF9ClOA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAv6jPj0b1wdZuioDw3Fg8pY-ZyknD5v4hKHvVGJbO7bbCuhFwGxpNjEEOgtv2eBic56NEpAJrhw2IrK3v9h7zhTY-Jrra9BesMaTh249Nu3MjpjbGHDORjQezShpfSrlREhAcZhpyzmdFNnR5kN9o-YsGGhTdGFyJRpU27GuK1Od0TkkObOoJsQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATHUfkBo_thzg7rJkxC1V_sXE_qrB8acNeKzOpQOzNQdBq1MRef9cel8fufNpGDQAac3EeXfUa8DkBDTcTIcy-YNSZ4Bpe2eXAO6h8dZy0CF-M8hXOwk5rpjhchlMw6HzEhDu82k05qcoGlzgro0ldVryGhRtcabwuG03BwEnJw85jMqFh8SbLQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtJhxqh4oWADVuVSX6Q303Z7atnrmGO7gPH433EE3YPvehrtXxlMZt4X5uT0pRDrz-2CuUqwoRZR472a1yn-xaQ_nW61_d9j63JlUx8cSR5fnvtQb5Dpzz3yacZXC_mm1EhCje-f9fKDfvpR8Dxp-W3NHGhTLcv3yHnDb2XwYJ9as1wN1XhGiew&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA1KYa3vTLWIKvTh9dh6QQQcPey8jdhZMgQYoLxZHMkENMdNwArAvqFSYRCpua_1bjLVoQKzRIZ8mfPxVCu6dxfOl3gAJy_R7_cJjLOrjuBNPBXYvsHKXLtZQjAFA_WknbEhBc92Skng9hZ4B8sl_IwZNfGhTrUQmWRZCw9Q4BJEaz9sllYj5fbw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAHG_3YBL_NDhObdl_g_kU_vsuasDPSYHUEUzqd0wDVQ4HSHr70Epib-d_BhTUhXNQrpqpwm8mOC4EMHvzlgqyv8ilXT4W7DfX1DA23ycDg4fYWfAqCs4tZQBykLrgoXloEhDX_Rm2-zHbCe9OJRdtN4Y7GhTsxIIs1VC9_z69NNQK9XYVI9b93A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAIJ86-AZg_LJQLu-l043zWiVUNBCXYA0KE2wWSgq7rJ0utUrYcf2XKvLKX8PirLKpMSLV4DEkG0yowUkUsfmay-xDgH7JF1irqCz7w_Ay-OSG8uMcXouAtJeYvIwSIZ5iEhBzr6BgEoDIOGMSITP5_ht3GhSgmJyQUhl16eD3LjDmJ90lpJID3g&maxwidth=400"
                            ],
                            "rating": 4.8,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.505211,-81.643191&markers=color:0x82CA75|41.505211,-81.643191&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-05",
                    "name": "Lobby Lounge on 6",
                    "category": "food",
                    "timeframe": "lunch",
                    "startTime": "12:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJ6fFs8X7wMIgRDSXQCiRNodE",
                    "phone": "(216) 902-5255",
                    "address": "1515 W 3rd St, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.4971258,
                        "long": -81.69412009999999
                    },
                    "website": "http://www.ritzcarlton.com/en/hotels/cleveland/dining?scid=bb1a189a-fec3-4d19-a255-54ba596febe2",
                    "hours": {
                        "formattedHours": [
                            "Monday: 11:30 AM – 11:00 PM",
                            "Tuesday: 11:30 AM – 11:00 PM",
                            "Wednesday: 11:30 AM – 11:00 PM",
                            "Thursday: 11:30 AM – 11:00 PM",
                            "Friday: 11:30 AM – 12:00 AM",
                            "Saturday: 11:30 AM – 12:00 AM",
                            "Sunday: 2:30 – 10:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "2200"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1430"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "1130"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1130"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1130"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1130"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1130"
                                }
                            },
                            {
                                "close": {
                                    "day": 0,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1130"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Raymond Orinoco",
                            "author_url": "https://www.google.com/maps/contrib/118290111462315650269/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-jR0Vtw6fWzQ/AAAAAAAAAAI/AAAAAAAAAgU/UxU2aBRVzDI/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "6 years ago",
                            "text": "I'm an ex-Clevelander who now lives in Switzerland. When I come home, I always arrange afternoon tea at the Ritz Carlton for a small get together with friends. Every visit has been a memorable experience. The presentation is wonderful, the pastries and little sandwiches are delicious, and the tea is top-notch. I've been coming here for years and the entire staff is extremely accommodating. It is actually similar service that you would find in Europe. Just make sure to make reservations well in advance.",
                            "time": 1320324067
                        }
                    ],
                    "photos": [],
                    "rating": 5,
                    "subcategory": "upscale",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4971258,-81.69412009999999&markers=color:0x82CA75|41.4971258,-81.69412009999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-05",
                            "name": "Dante",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJTVUrMZ_6MIgRiO3k0K14ScA",
                            "phone": "(216) 274-1200",
                            "address": "2247 Professor Ave Suite C, Cleveland, OH 44113, USA",
                            "location": {
                                "lat": 41.481441,
                                "long": -81.686196
                            },
                            "website": "http://dantetremont.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 4:30 – 10:00 PM",
                                    "Tuesday: 4:30 – 10:00 PM",
                                    "Wednesday: 4:30 – 10:00 PM",
                                    "Thursday: 4:30 – 10:00 PM",
                                    "Friday: 4:30 PM – 1:00 AM",
                                    "Saturday: 4:30 PM – 1:00 AM",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1630"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "William Eadie",
                                    "author_url": "https://www.google.com/maps/contrib/108304874238499843147/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-9byF44H6CU8/AAAAAAAAAAI/AAAAAAAAARg/VvxrFfR9ioM/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "Might be the best restaurant in Cleveland. Great for a romantic dinner. Menu changes frequently, always great. Wait staff is impeccable; engage them on the menu for insights and recommendations.  Tasting / chef menu is a treat. Can’t go wrong. Make reservations on weekends. Valet parking is worth it when busy given the parking situation. If it’s nice walking weather there are nice shops and galleries to cap off the evening.",
                                    "time": 1527830281
                                },
                                {
                                    "author_name": "Robert Musial",
                                    "author_url": "https://www.google.com/maps/contrib/116785820831377502720/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-sr3BYhNijD8/AAAAAAAAAAI/AAAAAAAAB84/xBJQbC9TSrc/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "A diverse but not overly complicated menu. Great wine selection. Very professional wait staff. Upscale without being too serious. One of the best restaurants in Cleveland. Worth going out of the way for.",
                                    "time": 1523544060
                                },
                                {
                                    "author_name": "mike dinicola",
                                    "author_url": "https://www.google.com/maps/contrib/101768394363425845647/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-t6WoHYohDWw/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq04wVWhih_RBt53J8dSqo4h40h0fw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "a month ago",
                                    "text": "Food was amazing. Service was average. Server while very knowledgeable did not acknowledge our request to change a part of the 5 course meal, had food delivered before the wine once and forgot twice about a beer that was ordered.  Would expect better attention for the price of the meal.",
                                    "time": 1525050449
                                },
                                {
                                    "author_name": "Shrey Velani",
                                    "author_url": "https://www.google.com/maps/contrib/106161537089859001807/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-ce2m8fOPRJk/AAAAAAAAAAI/AAAAAAAACX8/hNwnTcPDdXU/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Had our 6th anniversary dinner at Chef's table. One of the best dining experiences we have had in Cleveland. We are Vegetarians and Chef Dante was easily able to accommodate it for us. All of our dishes were terrific. A little expensive though.",
                                    "time": 1524776613
                                },
                                {
                                    "author_name": "Elizabeth Striegl",
                                    "author_url": "https://www.google.com/maps/contrib/105156767050261121893/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-IfiqkQ4tkjI/AAAAAAAAAAI/AAAAAAAAQJY/doSBGvupHF0/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "3 months ago",
                                    "text": "We went for the five course tasting menu for my birthday. We got the wine pairing with it. The food was absolutely amazing and each course was better than the next. It was a very Seafood heavy Meal which was perfect for us but something to note if you do not like seafood. The three stars are because I found the service to be quite lacking. I started to feel pretty forgotten about. Twice our food came before I wine and so we just sat there while our food got cold waiting for our wine pairing. And our server always seemed very rushed when he would come to see us. We did valet since there is no parking. I would recommend to do the same. We will return I just was disappointed that night in our service.",
                                    "time": 1519903822
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAudSu5FzDAXb91B48YNw5Z5VVnFhaL7P7D9Wc1Ds5CTzIWkhl5HboeyaaOxD3kOZtf3EJIEk28vBKphrbrmdBrEKzJ0TM8NaBQFws6GFVP3B21sLn0K-Rpha6Z6gKkR1pEhB2JOIafQUCSHfVMF_nKyUZGhRDirKnXzc9gy7H4vynOMuVim5xGQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAoHchfNk9_bRwA4C7hAqggRnAQvJJzFD26KO73RJ3fxQPmLe-z235PC_0-jNKMFbPFy3wWbV30FQ2aKSbmoML7uHsRThCGNclYOQQlk5BgIKVqgpTPMNBr-WNafQr_mdtEhCJmsSF7kTGeKDjnC4aRpoLGhR1Luns6cF0lcKcubpvSmnEt9b2tQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuAPhLLqQ8ST34ODL3Qx_cy95MZWlneIfRqftdSG0zBqDc4Bfz5InUV_lTtOjeniRRDpZj56MmiM4B9GW1qIJfJqmUWcBXGjQYY4icFq7hMtaPZn5mNJcnL0BxSnqT1C9EhBFAcDVEmR9MkijEGkHQuV9GhQuW2Qj5xF9tPkquWlXYWHdga1ITw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAO3Ewn0koo7OaQrODyu7gp08E274aLxCVYEWJXToyxWCVMc6KsBBCKQ1NPeYstU8mMvhIJ0JSkPOprAHgUqY-Esfmr_URVSpbYbkXvFXjZ-f9i-kUKTJ9j2uyVdHE69DgEhCf0rmp1NHCizNFur2lAjg8GhQrqL32OJn8JxjLqIKG3KulH4UrPA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAebnTfkXqSJqL8NZ5cw5sdjgP1pjQ__88GUGDD_vTx3gkrsJwBnQSdhTX-lj1HW9SSjf82WIcNTC9iO52fh80DCkEbQNFdZb4pTFTDBKBA-WQCCVS67OnpHHxnxn3XUhhEhB7Vs5YQAmFPtwWC4MTquqJGhTmitxJFKGRGQofO72PZJnlWkN7mg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmSlttUCqpxNM6OeILl0zzs5fKNQN0gBs31UgY7z8Dk-uNC0DZQkY8kU_E7BN6qjskGG7tbY8A78q0EfcTvM27L-G-7Z7ALj_vzaeOeuj0tToBF56w5sVb3YtYyKwNrl0EhDXCQC1bfLtMz4H5wSGTBTkGhRHvuZ1QTRkMta2wGrk8D5j_ASqqw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAvivqKdpPsG3i8tmWk8Z5lmnbPBu8DgW_Us57WeCu4q1W58d8QWq9s1em_Z3KGlLGLd_bhZ8e5d5oUJIFFaI_IVtLAqxAMDC4N834PLwx2vuxxOBgpxRa6ulu3TOLA-7QEhAy0EU03lcW4R5mge4bEQdpGhSSYvZtBEu0h_SAue9D74nMMgIxgQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAhu0F2dXC5CTt1osoj02eSMaKz4wOUDFeIES55rnPUAXU5ai-LCtfHE2khcKIeKUtxmfgabThMo1V-Cbyzl309lEgpB3LzKol2MA5WzLkZ-OyFSK7djz_GO9sJ_CosG4cEhDqniLnGMJHpfRpki6jaiZ6GhTYDkItw8OFAXAVY2mWd5JkWcKmXA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAZEdqPv5FCv9TNpTyg0vxpIoeEuOcKVYo2iEJ_AWHOhTp0Wrt1lUbPPW-r5KkAdBnx-z9v51784rdxxUPGzklNRkXdkkcpS3k2jAfl-2EnhFDtfRUb86aR1n5nImvFXQQEhBtffObeHBC1y1_bJBbBNa5GhSJ3Wh0t1cAqxOBMKzBBmHI3floGg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAKUHpYw-OIn-8fzkASNPyk24fongEu8qRymNDqNGz7o6RodULObHO7ws6NC7T2N9Iw4RZLmGgvhP6Pxp5kInq3zkyVu0aEviwAwjgzwfIyZi50xi0g5yD-2tMzVw484nkEhDuH6tk5wlqz7qHq_PrC1-zGhT5-46zxlL7_ANclkQQPyNFgCh_GQ&maxwidth=400"
                            ],
                            "price": 3,
                            "rating": 4.7,
                            "category": "food",
                            "subcategory": "upscale",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.481441,-81.686196&markers=color:0x82CA75|41.481441,-81.686196&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-05",
                            "name": "1890 Restaurant",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJU79i-X_6MIgRkomdbJoBcVQ",
                            "phone": "(216) 776-4576",
                            "address": "420 W Superior Ave, Cleveland, OH 44114, USA",
                            "location": {
                                "lat": 41.500666,
                                "long": -81.6907943
                            },
                            "website": "https://cleveland.regency.hyatt.com/en/hotel/dining/1890restaurant.html",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 6:30 AM – 2:00 PM",
                                    "Tuesday: 6:30 AM – 2:00 PM",
                                    "Wednesday: 6:30 AM – 2:00 PM",
                                    "Thursday: 6:30 AM – 2:00 PM",
                                    "Friday: 6:30 AM – 2:00 PM",
                                    "Saturday: 6:30 AM – 2:00 PM",
                                    "Sunday: 6:30 AM – 2:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0630"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Fred Phillips",
                                    "author_url": "https://www.google.com/maps/contrib/107697999992905972857/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-Frb6pQtW7Vw/AAAAAAAAAAI/AAAAAAAAAYo/QqTSUlwWA0Q/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "a month ago",
                                    "text": "Had breakfast since staying at hotel. Food was OK, coffee was terrible. Head downstairs to Rising Star for a decent cup.",
                                    "time": 1526232611
                                },
                                {
                                    "author_name": "Jamey Pischel",
                                    "author_url": "https://www.google.com/maps/contrib/105322525645318693151/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-1tk4tipEGcY/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1-GQWLe3zTlhO0btdsD4vYneaQvA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "Stayed at the Hyatt and had drinks in the lounge.  Cheri was the bartender and took great care of us . She made everyone feel welcome and had us all laughing. Hope shes there the next time we stay!!!",
                                    "time": 1519962160
                                },
                                {
                                    "author_name": "J.C. Andrews",
                                    "author_url": "https://www.google.com/maps/contrib/110140787124136083924/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-P7G2RDxhOlM/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3pcVhDCgtK-wSzJXQhyO1z_3IJOQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "9 months ago",
                                    "text": "I absolutely loved this restaurant. I ate here 3 days while staying at the Hyatt. The food was great and the service was impeccable, especially one employee, named Freddie, who's cheerful nature and friendly attitude was contagious and increased the overall experience. It's wonderful to see people that still have such great customer service skills",
                                    "time": 1504444516
                                },
                                {
                                    "author_name": "Brandy Andrews",
                                    "author_url": "https://www.google.com/maps/contrib/110810867384837910508/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-9_nOv-A8YnA/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1UeUymLUlwx1YMmbE_GPc5z3d6bg/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "9 months ago",
                                    "text": "We stayed at the Hyatt for three days and ate at the 1890 for breakfast. The food was never a disapointment. It was tasteful and filling. The staff was cheerful especially Freddie. He always greeted us with a smile and a kind word. Made our morning.",
                                    "time": 1504463024
                                },
                                {
                                    "author_name": "Chelsea Ols",
                                    "author_url": "https://www.google.com/maps/contrib/112342533209027565208/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-I69Hf8OQyVs/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3MC4Udg2pRP78zDtzgZOZnJgojGQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "5 months ago",
                                    "text": "Went to the Lounge for drinks and an appetizer on NYE. Drinks and food were great. Bartenders were very rude.",
                                    "time": 1514828924
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA3Z7U7bLgZTQg1MCqQwJo5KiDdMlRLlMm59L_YMvNJhtUmDQkZCQqDBRi92l1vEay31vLN0s5q3N0xdGhKBjJfBOdfwvfvHyGSpe4cVkyOv2mSQs0WQJAWVTiz9NJWwLLEhAVzH8VzQHECQFeTY35X506GhT2oFqZqlQnATtGSpJmoMrS_XuNTw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAACkUQl6lEohFuSTpYhbzJMIhUDbQ4my8A5tR0WNyC4aEVCBJTEcGGqTqWX6ntvP3BJ7uY1MwyxsJEDGSq88WAydQC4ME6vhGP24ErUMzKjiycQVCU-lXekJEo6uVhvjSHEhChYeHpYGuf8S1nvU2oMQJNGhSLZonUWja-Z7va6CXpSPmwsX1y9g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAm4GV0yUd9tPkmYHRn1ZAoSb4J-kxZkE9Yq9qU7BPKkqpc8EdK3xcpEOxGg0cMTtC8nWVcPVXbyAQ5DEDNUwvIpbq5PDQ09mlLTQJCezFtsHglZ9yuOVap6g5ALUyxI7cEhDpg7hzQezcIOIm-VSk_x4cGhSTf1pCDpZ0vxgNfCcC0kGX6SLxeQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAfCWEuzgAzFNStomQh3qaIwVlKMXEWSoGmxJa7w5pR1L9hs-a-lO2lsqzg5R4uqd_hp8UoLH6JOYq8pA8OPs-AWxwTq345EJIkohtte2xQ-xfx0QPVYDnNOxNuG73g-KiEhC8uCeDVTHKeiriY7HPqJAXGhRXzFk8p8r90qOT-wE3MGVrgLfO_A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAsAUZteSZT7VZHMesmyhyYxFOZg5wo7IgAEIafbLsZP175i1YE99fvDMoT2-66YgIuLTp_ccp3NX6aCRqMNY-5jm_MUVX0NCbk46IYUlsBdZR1xlLWmdhdevSITM88Ue2EhAri8-cmU97OMiIp2OmRZiHGhTyy2Hk1_ekfRT6aYZlAXORbYLSLg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9mzeTGYJM5TTzTMx_Lj3ezv7jxW53lBLGY7Hya0RVrO7B97bDqTdewIHKucwuN9ui9XhjukKfdqMwkORGeSDkjENAIsKjkwjxZ43CYO_mCdn-7J3KzYiMoRb-JZZIGFKEhB7OIU6IOBLygPXhZKyJIsnGhTOhPrTjnvBWduZQ72TA4_RXrbLwg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAch3ZD40LonzuDjkOQ69ddHwGlkr2dlBBxwIStfzkL_von9QC0rYKJu9gnUaGjRoH4iI7h-GnmrpXBqvkZkvQOWQHEYMJr9ivaTCV4vTxNCLN_-VwGL3ivHbyn3C4YQc2EhCFCw2-RjuQMu25TQfMq_ADGhRi86ZWwXVcFDQGehceyWJ7W3HBhw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnbQzhq_9j7bKDVEDhhBhUw5HKdlUKqG_Pznb3eydi25ihyjVZKxekZLvt333rXQxayyA7cLCi8DNCGtKBuSpdYeU3AsET4KaOLM1uiPUFVStlSq5KY2029Z6oJzrDFnHEhCBjfPTskADoPO3gQyqsb3-GhQMWSogPgCG-uYh3gqXN6_aRaNahA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATOZpWlNOHBJ-m4I3SEmI1AK6vFKdcoZCI7cLW1FI0_1e7kE7guI2ZnccK0TzDAs4RzEhDYeQTzT_X6n6Q9q7FNXMKDd58w4ekN7w7UYwUk0u15je2McRyTEs4E7xvBisEhDkiVALTTW64273r6VwrsCdGhQp3MJ4GTH3AoNSsieuLx8a43JJIA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAl-jwrXHSWj1CpMco-36s6WSLxcr62nYVRb40s6e0owSHoqHSkP9NaSglzchO5h-8jpp3yFstwX1My4j_fh2JoVH9LuES9m626cImhCJHIgnr36TKxKchxpDa4xc1M1lDEhDB3CH4b2WWPc5cQmmBOW3sGhQxH3F5KOtrT8ZW0V7ylkn2TJoXyg&maxwidth=400"
                            ],
                            "rating": 4.3,
                            "category": "food",
                            "subcategory": "upscale",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.500666,-81.6907943&markers=color:0x82CA75|41.500666,-81.6907943&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-05",
                    "name": "Health And Wellness Services",
                    "category": "day",
                    "additionalTime": 15,
                    "startTime": "02:15 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJdTXQa2H6MIgRNzbWs02FIxc",
                    "phone": "(216) 687-3649",
                    "address": "2112 Euclid Ave, Cleveland, OH 44115, USA",
                    "location": {
                        "lat": 41.50294309999999,
                        "long": -81.6712854
                    },
                    "website": "http://www.csuohio.edu/offices/health/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 8:00 AM – 5:30 PM",
                            "Tuesday: 8:00 AM – 5:30 PM",
                            "Wednesday: 8:00 AM – 5:00 PM",
                            "Thursday: 8:00 AM – 5:00 PM",
                            "Friday: 8:00 AM – 5:00 PM",
                            "Saturday: Closed",
                            "Sunday: Closed"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 1,
                                    "time": "1730"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1730"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0800"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Mario Roberto Contreras maheco",
                            "author_url": "https://www.google.com/maps/contrib/110324220473949286070/reviews",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-lLYPMorhtYA/AAAAAAAAAAI/AAAAAAAAAMs/WF6ZsSGQSCI/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "8 months ago",
                            "text": "",
                            "time": 1505763533
                        }
                    ],
                    "photos": [],
                    "rating": 5,
                    "subcategory": "healthAndWellness",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50294309999999,-81.6712854&markers=color:0x82CA75|41.50294309999999,-81.6712854&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-05",
                            "name": "Connections Health Wellness",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJPZXKqW3vMIgRyWic2n1tgTI",
                            "phone": "(216) 831-6466",
                            "address": "Chargin Bld, 24200 Chagrin Blvd, Beachwood, OH 44122, USA",
                            "location": {
                                "lat": 41.4101037,
                                "long": -81.71023509999999
                            },
                            "website": "http://connectionscleveland.org/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 8:30 AM – 5:00 PM",
                                    "Tuesday: 8:30 AM – 5:00 PM",
                                    "Wednesday: 8:30 AM – 5:00 PM",
                                    "Thursday: 8:30 AM – 5:00 PM",
                                    "Friday: 8:30 AM – 5:00 PM",
                                    "Saturday: Closed",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0830"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0830"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0830"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0830"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0830"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Raynita McGowan",
                                    "author_url": "https://www.google.com/maps/contrib/111311873560882144883/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-hbMyqSdMT8E/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2_xEdkwpspGJzA_HqihoaeqnuLmQ/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a year ago",
                                    "text": "I applied here a few months ago and the hiring staff and receptionist were so nice and respectful. Staff there seem to genuinely enjoy what they do. ",
                                    "time": 1471344731
                                },
                                {
                                    "author_name": "Steven Dickerson",
                                    "author_url": "https://www.google.com/maps/contrib/106889277852516111072/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-x7HMlsRum-c/AAAAAAAAAAI/AAAAAAAAB8M/wQ4XAFzZ6iU/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 years ago",
                                    "text": "Great staff. ",
                                    "time": 1462076600
                                },
                                {
                                    "author_name": "Jasmine Moore",
                                    "author_url": "https://www.google.com/maps/contrib/116696694342620055199/reviews",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-Y1-DEW2oWGM/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1zd9rviaij5Q6xMV-_XgWtRxPyVg/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 years ago",
                                    "text": "",
                                    "time": 1458063690
                                },
                                {
                                    "author_name": "Llered Semaj",
                                    "author_url": "https://www.google.com/maps/contrib/103926305407064752070/reviews",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-ljmagvySbkc/AAAAAAAAAAI/AAAAAAAACik/TxQ6rvSwfTk/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 years ago",
                                    "text": "",
                                    "time": 1457107227
                                },
                                {
                                    "author_name": "Crystal Harris",
                                    "author_url": "https://www.google.com/maps/contrib/113063470351748369944/reviews",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-LzKg_qZ2cy0/AAAAAAAAAAI/AAAAAAAADFw/SAejsxoSCzM/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 years ago",
                                    "text": "",
                                    "time": 1447089161
                                }
                            ],
                            "photos": [],
                            "rating": 4.8,
                            "category": "day",
                            "subcategory": "healthAndWellness",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4101037,-81.71023509999999&markers=color:0x82CA75|41.4101037,-81.71023509999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-05",
                            "name": "Innovative Health And Wellness",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJt8T9MbnlMIgRaNrD88v6j0s",
                            "phone": "(216) 573-5600",
                            "address": "4801 Acorn Dr #1, Independence, OH 44131, USA",
                            "location": {
                                "lat": 41.3935414,
                                "long": -81.6581777
                            },
                            "website": "http://innovativehealthcenter.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 9:00 AM – 5:00 PM",
                                    "Tuesday: 9:00 AM – 5:00 PM",
                                    "Wednesday: 9:00 AM – 5:00 PM",
                                    "Thursday: 9:00 AM – 5:00 PM",
                                    "Friday: 9:00 AM – 5:00 PM",
                                    "Saturday: Closed",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0900"
                                        }
                                    }
                                ]
                            },
                            "photos": [],
                            "category": "day",
                            "subcategory": "healthAndWellness",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.3935414,-81.6581777&markers=color:0x82CA75|41.3935414,-81.6581777&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-05",
                    "name": "Buckland Museum of Witchcraft & Magick",
                    "category": "day",
                    "startTime": "03:30 pm",
                    "additionalTime": 15,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJo_QhBwrwMIgRmXQQj9UObQE",
                    "phone": "(718) 709-6643",
                    "address": "2676 W 14th St, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.4757719,
                        "long": -81.69130679999999
                    },
                    "website": "http://www.bucklandmuseum.org/",
                    "hours": {
                        "formattedHours": [
                            "Monday: Closed",
                            "Tuesday: Closed",
                            "Wednesday: 5:15 – 7:00 PM",
                            "Thursday: Closed",
                            "Friday: 5:00 – 8:00 PM",
                            "Saturday: 12:00 – 5:00 PM",
                            "Sunday: Closed"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1715"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1700"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1200"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Brian Reger",
                            "author_url": "https://www.google.com/maps/contrib/106432959868050984476/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-3t6kMVuwvVo/AAAAAAAAAAI/AAAAAAAAABQ/vF6KwBcnaPU/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "4 weeks ago",
                            "text": "Amazing owners, very knowledgeable. Great and unique items. Well worth the 5.00 admission. If you a Buckland fan a must if your anywhere near Cleveland. You can ask questions and get the back story on a lot of different items and people that were involved with Ray Buckland. It brings me joy to know that this history will be preserved properly and available to the public.",
                            "time": 1526588859
                        },
                        {
                            "author_name": "Jude Ess",
                            "author_url": "https://www.google.com/maps/contrib/118184974702706879806/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-MoM2WQlYV1s/AAAAAAAAAAI/AAAAAAAAA_c/cRNTI3g6GSI/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a week ago",
                            "text": "Great conversations, loved the book selection, wonderful artifacts-would definitely visit. All one floor, well lit, and the individuals who own it are kind and very knowledgeable. Emphasis on Wicca but open to a vast pool of magical studies. It was such a delight to find it on trip advisor and it made my day! Felt safe as a queer person as well.",
                            "time": 1528159030
                        },
                        {
                            "author_name": "Alex Willis",
                            "author_url": "https://www.google.com/maps/contrib/113381687536563356086/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-1fFZqyMifJI/AAAAAAAAAAI/AAAAAAAAICw/XTvT__6YlHY/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "Truly wonderful gem in Cleveland! Fascinating artifacts! Wonderful staff! \n\nMy partner and I were visiting from out-of-town and unfortunately the shop was closed during their regular hours due to the owners being out of town. On a whim we emailed and the owners were incredibly swift in replying and were able to find someone to open the museum for us! \n\nDefinitely check this museum out!",
                            "time": 1522891788
                        },
                        {
                            "author_name": "Ghoulie",
                            "author_url": "https://www.google.com/maps/contrib/113694316284854335336/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-hYI1If-lDCM/AAAAAAAAAAI/AAAAAAAAYTE/ZHA33zMkcQY/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a month ago",
                            "text": "Seriously one of the cutest best experiences. It us very tiny though but the owners are amazing! They give you a tour about what the museum is about. They talk to you and ask questions and carry a conversation. They are real people and you almost forget you're not hanging out with a friend. Very friendly. The items are interesting and there's even a demon in a box.",
                            "time": 1524745683
                        },
                        {
                            "author_name": "Tyler Deitsch",
                            "author_url": "https://www.google.com/maps/contrib/103431221725616948299/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-YU3T5nmOmmE/AAAAAAAAAAI/AAAAAAAAC1Y/vn54Xr05h1Y/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 weeks ago",
                            "text": "This place is amazing. The collection is small, but so well curated and Steven, the curator was so engaging and truly a compendium of Buckland and Wicca knowledge. I'm so glad I drove three hours to come visit!",
                            "time": 1527359048
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiClgaUOjKljUZj4B8Tgap_DH6OYCA_gA7Rmaoh1baSXsh4mrZAuv9b00cRCfe5bFDTXFX6c40qKpEYoF2F7xNMDSoASI7lsM7c0cWjsyfQ7iuG5vLnzjGk1w8u5LPSkxEhB1W1kW0JLWwSclyhnSSvIHGhTi3xZMZCH8HOD7_Xi2BkeO2cxqLw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJFDn7sQOWihgFRe6jczBNG3ZxlM88rAzq2tGl2vd_DjjCkOTXDWEuAWN6njiWxiTQkzHIuQTjH3XmGATodIEKzmws7SMYi3KWcXIkjeVBQVJTXtM2yD3xqkyzBBvMBbdEhC3GFm6_lItYuiQz8ngRvTEGhQQoqbHiH8jq4GkqppilWpI0okQUw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAbAHwIcKSZXUq_BPHVg4DvavVx6_Fm4vaOHYzfTKEJs9zcUiE6OLp2Fbz9h82ukahRdMj2tGgqlwhRxhhwwMRNRaxfeDUyIw6Sezl55OoXIzvMh8531c2VpI0zN3ckci9EhBEdstuUWMR5VVRqgkjVjDVGhTKyyz0b3DEwGul3IIdWmWzKJk8Rg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWPMHcuN5FjqOlUJQCGvDfCJ6XScNhAKM1ySjpuFa32CcMrkaMc4v4X684DPEQSLB7nP-lpz6D0TdcmY7Evba-0ncG6x2x2HvvxP9D49hX63qRp58eyJSwRQx_Dzc_ZrAEhCrPvkOllPx4zqNPgPue1e_GhRTFewsgzYPgOrnin3iC9OfNdC2yQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAslgUpWr3WAKWsdzI1iFeHHarQ_OGdT6Q-zCGb6CxS3xqGLDqZ3s5NkJa4-cZPu1GWT5vgoRbT4uVB1B_mElqW4ybcn52dVqXINzmOZAWdRtx0D16FPCXe35l8M4iD4ttEhAbex1Tw0u5y4CP5Euyhb5PGhQUuDpel4eeDzKtEC9oixWj1FWcRw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAHwL_9Vs6LZPvUh8Iv3kVeoP1dvxLOPJK2GVSf2Fqrn4BA0zko1al1p0LiGqtEuJJBxytXC1xZ4mZs4vJ7cKJx9TBF2dpHLidpwUpRudLYm4DS8O-1KukjggBUfBqLU6LEhBkaP-zssVkrIV8tecxupkrGhRrOCnH9lLoQuJqh6SJ_HLjvIVpKw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtdrLIotf57vZEwKOdxHhAEw0t4OgatElb7Wixw_NI-EopnBkEBEPLzL9-Ys3e5xWk0dIxRf5EJh1mf7kKH1j5VrO96-2tZr4R-diW9WdIS0Rrr3fcS9P_37ZKtXbtbT0EhAx8baToATcJdY1rtnXP5rZGhQXrIQ3Ff3kMzXLPT6BRHIwPs7u_w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuH6DOp51xYCxXqnwFqw93v9_OiW3dqeePuZxrKw2VEn1L6wMaLj-d3n9VfLT0kPPx4w_iNpUlcYZkLTSGRkEL_CoTidl-YCr4gxYfedeIXiooqc6svHOLukOwce8tNaOEhC_SmALO4REdt8GGXMX6aK7GhRxut2MRIeonLWoWinwaPu3jwgafQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAqHHe3w8ZvqST5hDjbmEVlkJg0AHaGzp9MLVONBil6HxKvK9AcKEoEhjtmEht8Flu7AfIHyjAsM2rR9KBnzLHzxxoVpV5Lmace6PcUSKMMB0zWZQDj36OiYoXrZQcx9CXEhAIOD370bR_tsU3FXhdVHUNGhSqqpDNH1D0sJg8fCuhf9qzx44kpg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEtbKUs-i-LIAOdZ8g4J3-zxpaorOeC1ckmJMpbuGRAMseoZnYasUC0DYFJX_LfALFqbqha_SEJxi-w9bIgqC6bC8kNlPPT8ml0DAT7MVlV1nHE5yO1MxAHglNvRWJ4GuEhDf8XZSfIw19aZGqG_DXxckGhRLrKbGS6_Y5iQXcRCzyHD1-w6FRQ&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "subcategory": "museums",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4757719,-81.69130679999999&markers=color:0x82CA75|41.4757719,-81.69130679999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-05",
                            "name": "Hungarian Heritage Museum",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJfwyNRn_6MIgReUZmrNI1nIQ",
                            "phone": "(216) 523-3900",
                            "address": "1301 E 9th St # 2, Cleveland, OH 44114, USA",
                            "location": {
                                "lat": 41.5048384,
                                "long": -81.6895029
                            },
                            "website": "https://clevelandhungarianmuseum.org/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: Closed",
                                    "Tuesday: 11:00 AM – 3:00 PM",
                                    "Wednesday: 11:00 AM – 3:00 PM",
                                    "Thursday: 11:00 AM – 3:00 PM",
                                    "Friday: 11:00 AM – 3:00 PM",
                                    "Saturday: Closed",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1500"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1500"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1500"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1500"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1100"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Michael Snow",
                                    "author_url": "https://www.google.com/maps/contrib/115915810204065827744/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-C5ZGSoVrqys/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1XXM--3huSBHeyq6msujVAUiQmJw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "It is a small museum but what they have is worth going to see. The staff did a great job of going over everything.",
                                    "time": 1528397572
                                },
                                {
                                    "author_name": "Stephen Swidarski",
                                    "author_url": "https://www.google.com/maps/contrib/105649095476797152790/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-8EwUFgQlZ6k/AAAAAAAAAAI/AAAAAAAAAF4/jquYux8vIZ0/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "10 months ago",
                                    "text": "What a great surprise to find in a shopping mall. I'm not Hungarian but it was a fabulous display of culture, artifacts and history. I would really recommend everyone going. ",
                                    "time": 1502918774
                                },
                                {
                                    "author_name": "Michael Iannacone",
                                    "author_url": "https://www.google.com/maps/contrib/108740801433324961991/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-l1fEa4YiUmo/AAAAAAAAAAI/AAAAAAAAfmc/r6nYyAQTht0/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 years ago",
                                    "text": "The only Heritage Museum in a Mall.  Worth a stop, just for that.  Oh and it helps to be Hungarian, too.",
                                    "time": 1456248313
                                },
                                {
                                    "author_name": "Marty Robinson",
                                    "author_url": "https://www.google.com/maps/contrib/114418321984685138349/reviews",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-StkqV8jNIrQ/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2IwcXayJ6uKavcGFNaclFodBGc8g/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 2,
                                    "relative_time_description": "2 weeks ago",
                                    "text": "",
                                    "time": 1527678461
                                },
                                {
                                    "author_name": "Jozsef Foldesi",
                                    "author_url": "https://www.google.com/maps/contrib/100113832463012472100/reviews",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-kgVrLWE939Y/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2fPQBcgp57leG-0zJRLuzvzRBB7A/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 weeks ago",
                                    "text": "",
                                    "time": 1527676221
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA33bZ75Ez6mX8mKRA4PsaFUrLKeu8a5IhlJVvsi8A78ndbT7xEJH4KXhb2gvEW8tNQuG99LaF8S3NpW1rso-8BelyHRN6yyL457Nm9nZcx1ZVgYoHA-Wh5LwWMifnbQFSEhBDjBMSsALndVQ4QDQ5-gphGhQbH2tmtW8VteKCDStTIicWInc48A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA6p8oGuwTWgKkDijKcmwojL0JKxfXRhQMWSvRXhDQ63szDHd-5DPVCogI6jjJq4z23BKYhLLuMIdlTLnpyx3Qu_wUJn4scwNWmhACz7pKI0Dyf4yaagCKgvnzlBHQe9ppEhDjqyFHE4pYL6wSCyxN_LsnGhSUz2BCs2w-OWc_6G-OC88wDvDhpg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAgeRNcyFSHfXZa4WVgFPvQMHL-6ubroX-r3iICSoqJF06TFmOXFZs_jK_VEjvAeomHIBbc3A4iWW5jlPHwjJz7zcZqh__fbmZlPqMWrPYbtElW3N97JyhT6fctfF8sqFfEhCmLwzJDxx0OjHkZCoLRZC_GhTKGWE9tC7IaB7A1YAdOeeYwIkOeg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAN6WGqqsPl1WdRInIuam3d6zEJxUynZTFs38nOjGcjGiGRder5_t-Z3nLntrJLKwD73gzPFlLE0ggBeY6cVppq38Gd0xVyWcYkaZ8GKsrEz3zCSfs126f5JImqs80F2anEhCj3xlbLC9m7BdUq6i1dAzSGhR4dpw99HNxRQDP3BcQeyuRw4-p5Q&maxwidth=400"
                            ],
                            "rating": 4.5,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5048384,-81.6895029&markers=color:0x82CA75|41.5048384,-81.6895029&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-05",
                            "name": "Dittrick Museum Of Medical History",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJgcDo0Yj7MIgRKzs0r61cRYM",
                            "phone": "(216) 368-3648",
                            "address": "Allen Memorial Medical Library, 11000 Euclid Ave #3, Cleveland, OH 44106, USA",
                            "location": {
                                "lat": 41.50591929999999,
                                "long": -81.608414
                            },
                            "website": "http://www.cwru.edu/artsci/dittrick/museum/section4.html",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 9:00 AM – 4:30 PM",
                                    "Tuesday: 9:00 AM – 4:30 PM",
                                    "Wednesday: 9:00 AM – 7:00 PM",
                                    "Thursday: 9:00 AM – 4:30 PM",
                                    "Friday: 9:00 AM – 4:30 PM",
                                    "Saturday: 10:00 AM – 2:00 PM",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1630"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1630"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1630"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1630"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1000"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Jensen Turkovich",
                                    "author_url": "https://www.google.com/maps/contrib/116090100378118220065/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-410m41p5CvI/AAAAAAAAAAI/AAAAAAAABdQ/JFU3vrquXR4/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "I wasn’t expecting very much from this museum since admission is free. However I was surprised by how much information they packed into a small area. I learned a lot of interesting facts during my visit. There are lots of visuals however there’s also a lot to read so try to budget some extra time.",
                                    "time": 1523372903
                                },
                                {
                                    "author_name": "Jim Daniels",
                                    "author_url": "https://www.google.com/maps/contrib/112630723610696400227/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-_-peJ-i0CAU/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2K9nglQurN8-lbFnTTJJutw_0Anw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Really enjoyed strolling through.  Nice displays, and rich immersive history of Case Western's early days.  Learned a lot about Clevelands place in the founding days of Radiology, and the progression of the physician over the generations.   Small but very dense with displays and tons of information.",
                                    "time": 1524250875
                                },
                                {
                                    "author_name": "Paul Boyle",
                                    "author_url": "https://www.google.com/maps/contrib/115265556699560767499/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-RHP0gOLjvh0/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3hy3l8rdKfZNdJJgw2FhVB1-3KFA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "8 months ago",
                                    "text": "Super cool and unique. Amazing collection of medical devices. Rare book collection is also great.  Love it.",
                                    "time": 1508012784
                                },
                                {
                                    "author_name": "Nelson Ramirez Velez",
                                    "author_url": "https://www.google.com/maps/contrib/113686092991211321220/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-b6F1m2UAmW4/AAAAAAAAAAI/AAAAAAAAAI8/AzjWYP0fZqE/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a year ago",
                                    "text": "Very cool medical museum\nAbout 1-2hrs",
                                    "time": 1494621506
                                },
                                {
                                    "author_name": "Robert Bishop",
                                    "author_url": "https://www.google.com/maps/contrib/101596873170111408269/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-FkZf2dfvwLQ/AAAAAAAAAAI/AAAAAAAAH28/PeDQWQ_CweM/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "3 years ago",
                                    "text": "The Dittrick Museum of Medical History is not a place to visit if you don't have an interest in medical history - but if you do, this is a fantastic experience. The current exhibit is on the history of contraceptives, and it includes a wide range of historical products presented in a interesting way. The museum also has exhibits set up to show how different era's of medical technology would have looked (doctor's offices from one era, from a different era, and so on). The other draw is the rare old books selection. The museum contains originals of interesting, old books that are well illustrated and kept in good condition",
                                    "time": 1423237494
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAxoZtOYlg72YamDyMu0L-8t0Q5uQmFH95_VOzCj417_FWqtLZ7XixRYqwYskEWgFPcXpu7bPKipUffnY4txH0Gv6Nvc2jtlFc9k1iaPF1QaOQuiPNX5moYwwyCtwiYnuXEhAHrlMPF-MGQpB0dNHZdT3DGhQWAMBa99SiY_O7rH8DUWRA0YGpag&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADDK1tbi_218OBAwAlpOiKdFOVs5-12jSvV_CCv7vyNuPRojk0l5han-qIKE7DCW_0_yBtXFuZuXnr3hhZrgVUHgh8688c_JDP-iE1g4ylq6XjlAgWPe1OMo_Knh6oUXhEhD3_CK-r4TyRO5LXaB0hIKBGhR5i8VZBXR55dzTXE9gozhxHpMfzA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAyV5VaVPOeL6OvDnKvcN8kuMGJ8opd1ciOJ0T72qEuqptubqFJg1Sq-ujwMtQXFDXLsfsRVSj25Uyi6rcUZjy_wkWuk5pTuu0CAEQjda17hsNi91Q2yKSMQoTE6dyfnv4EhC_88ClTKG1V6eyK5RbkWZzGhQ_My1WFA0WBUkHOXrnSANceDQJog&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAt-4UUbemAbxApppa1g3TVJ7Cd1vHkMsWxkVjDIpi7jhiUHn68cPHm4J0W5qG7k4BSctr81eFVHY0bqUNuIIoBOTvkq6rzstm9krBfirANRL0VP1Q8MkNS2gF9yV2OJRpEhCuA_86GOZKH5Dww_fxVDASGhSdSbPHR-R6MnWBGG5VEYQqsbpn5g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArmaiJl_GnJS8KfYJX_U1SntBldMpQt1AXtqHH-bkbqQYI2wlbhAV1h3NRQ3cOCCy-nWdbLvIToKTAu2J9PG9o86lkl90O5HLDexArcfwVZzjHWWEF2jsgWGtnz0LXq3iEhDTJcxUQRntnFEgIVkjQCwoGhSrlU5EZbD_P-6LMoMdHNJ0FniAuQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJ_ayhDsrbs234-R4QEG1_tNM_PySq6Iy7jvsr3sP4YT89XOzCYRXe6A7t9OxnRTJJgU6tuLy-FkE_1eKrkT6IKsyCbFNayupWCdp9sBauRXMCjkTt_JdiBwkyORmc9qoEhBshJmRr4GPNC3TMxgZf7DqGhRLEFluFKJZmxcDmrA7SflVXU1lHQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAeUjpC2YTanl2MO2FJSStSot_QGkY5PdpJWbM8kOVpuFK_IACLpxtPyCfC8HMjeY5FcFM2vYEfSDPH4zQm-M-F6SOoFdBwWzIfKOPAjn5HLANIM-KQflu6m6jd7CrYtA2EhDmEt6PSzMoApn28ZehhRoOGhTIrdhZCczARZi9NG6jDUQKh76HIQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9UxjQTptYN_1yt2DDg-nVByPw9GcAX_2k2i6UkxhNdWwLvOAdfIzCAE4jSDru6ZnE5x5LnkMtsgfZGus7gxbiJ2b6WFCdhK_F8UNXT8XS2VLTEHEapnHmfky0jsPtL8xEhBi-fCSJiPgdOpPlhA9TEDuGhS_bX7Ic_kobLn5_JvkaStog-JxVQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAk7xaICxNvTVXVnPmhmolVd8MO0uPczGKdF24swg6sS6eup1UaSpqBpdacizpJ1yWWMj9fDi3PmujRup0Xz0h4bcM2y60RNCHEOiuQlswV35PcFEsiqF7yjp2agiCacQpEhCjg0YTrZm-600W2Ft8kojYGhQrhoSAzVynr6UiqW_lIrxSBEDfoQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA3UurU0Iaahg1yHLvfhkY-COL_qc86zk4zSPEhf4judGe64xhxClsflYH23n8fNVJcPpBiWqbjZquczCFZUqvzQilVXWhtCYzHhHk_9t6r-EbivVVpGzn-iLqN63UFZweEhBhB-9YRkIkGR2FqAZkbXqOGhQu1zX_99QOVWUSR6ZUGQ2WMZKkBg&maxwidth=400"
                            ],
                            "rating": 4.7,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50591929999999,-81.608414&markers=color:0x82CA75|41.50591929999999,-81.608414&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-05",
                    "name": "Beviamo Cafe",
                    "category": "food",
                    "timeframe": "dinner",
                    "startTime": "06:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJu4GdKZ_6MIgRBgikeagnlQU",
                    "phone": "(216) 202-2300",
                    "address": "2275 Professor Ave, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.48102900000001,
                        "long": -81.685921
                    },
                    "website": "http://www.beviamocafe.com/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 6:30 AM – 6:00 PM",
                            "Tuesday: 6:30 AM – 6:00 PM",
                            "Wednesday: 6:30 AM – 6:00 PM",
                            "Thursday: 6:30 AM – 6:00 PM",
                            "Friday: 6:30 AM – 6:00 PM",
                            "Saturday: 8:00 AM – 5:00 PM",
                            "Sunday: 8:00 AM – 5:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "1800"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0630"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1800"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "0630"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1800"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0630"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "1800"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "0630"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1800"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0630"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "0800"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Norma Coleman",
                            "author_url": "https://www.google.com/maps/contrib/103869945709750090708/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-W4bsV803PSo/AAAAAAAAAAI/AAAAAAAAAAk/v_LN-t5eLFs/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "2 weeks ago",
                            "text": "What a chill place! Stopped by on Christmas Eve morning for a quick jolt of caffeine. It's located in a cute spot in Cleveland. Some parking at the front and some seating inside and outside. \n\nThe espresso is great! Served with a carbonated water to help cleanse your palate to enjoy the taste.",
                            "time": 1527483739
                        },
                        {
                            "author_name": "Peter Camba-Alvarez",
                            "author_url": "https://www.google.com/maps/contrib/116663894133089159320/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-AOaukSbJEYM/AAAAAAAAAAI/AAAAAAAAAO8/HriUTK8ie6g/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                            "rating": 3,
                            "relative_time_description": "2 months ago",
                            "text": "Tried this place out for the first time today and I was really excited when I saw you could order online. When I arrived I was told that they had missed the order but would make it right away which was a bit of a bummer. Other than that the customer service was great and the food was really good. Plus I loved that the cold brew is free!\n\nUPDATE: I lowered my star rating because I went back the next day and turns out the cold brew isn't complimentary. They just forgot to charge me for it the day before. So I arrive thinking my order is paid for and they make me pay $3.75 for a coffee the size of a tall from Starbucks. According to them because the coffee is made fresh, they make you pay for it in store separately from the rest of your online order. Clearly they need to work out a few things.",
                            "time": 1522321398
                        },
                        {
                            "author_name": "Emily",
                            "author_url": "https://www.google.com/maps/contrib/112830214906432743859/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-mlMo6drgTdA/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1fNIYmPvevylFEbA59RAa4v1qkqg/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "Love this place, just tried it for the first time two weeks ago and have already been back twice! Their coffee is amazing, the food is so good and very good sized portions at a super reasonable price. The staff is so friendly! Try the Princess Pesto, it’s my favorite so far! And the DK bowl is delicious and so filling!",
                            "time": 1522153156
                        },
                        {
                            "author_name": "Mark Michalik",
                            "author_url": "https://www.google.com/maps/contrib/113822115116541868473/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-_He6iiIYA9U/AAAAAAAAAAI/AAAAAAAAD0k/je2UcqJgGkk/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "Came across this place while visiting Cleveland. From the reviews I was expecting a small place with a limited menu, but it was roomy and comfy with a fairly large menu. They said they just expanded into a larger space. I highly recommend coming here for coffee, a smoothie, or a sandwich. They have vegan sushi too! Lots of vegan options.",
                            "time": 1521812829
                        },
                        {
                            "author_name": "Kristin Gardner",
                            "author_url": "https://www.google.com/maps/contrib/116391706856819887263/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-Jarrmxj3c5w/AAAAAAAAAAI/AAAAAAAAANE/9AYO-h0fHSQ/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "Fantastic people, place and beverage/food options! Definitely stop by if you're in the area!",
                            "time": 1523642701
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAZd90_soOapxCxAz_Zz6QwFZhIpwsqC-7EYZDpevmzLhBqrL1hB8GYLRsRFZRwJYw2PTxszJWtYAckEwA9g4QKztFJeLLJ09z1LjzLmfoHlmR05fhtDfO_WD4D-fCzLZAEhAf2MWsdUcsgNS3lqUuFTLBGhRtuLz5ML8zoPGnSboGMPtASCHRLw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANs4euz1WWmV1ozAU0pRIjwLjqm5M9jKqTZkqUsiHuExPJx4BJ6SF35GyPpwQWQFQ2U7iQqq1enpX-m5zs4ACV-Mw1BY2WCulCeVRezVIvP1V4kNsIK2PP6xJto4-zJgpEhC3n-BA1OEsvJr7b5_v_pV6GhRaln_gBg05P2XUzfyrBgIajNrzAw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnaxLnXqVewGyl1ti3VoU6eDVdGwkRgEGDB5iBM6W7ct_5TWwHI44ABgH4aKRSpo_tr5AjKdkFUvtFvvSInWNA_catwwYrfkEuxqNLWD37nG7EVo8NlVdugYPxF32P5HbEhA7SnJ6EbVM5Advw0iO0ZlHGhSb33hPm6vdja5uNoK40npScBB8wg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjr_0inazTulJ6fu4Gd1wgVRa5sB7CUl5vqVQmx0SE17t0i2rKue92xeqvmOZnO8lw1jCJrhebjMpZCyAbkzR13vCpgPQbqbsDskABwAK-BkJ-YgJqlzMYhH0FJyb6ZvGEhDS-2vp8gAkYuzuiwgOOtDdGhQE81Pt_Sqr_kVJ9EpP5s032DizHg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAfO1PxEOwCq6FVTz-kxzSita-mdImUE6w0nxcTo6tFyDZWB402-n2h5urCFPQbqeW53vAu4GM9Ogvf5nvzGadLil0lndg1SShSpHOpXPy0xGV9J60g4p9tSqOSBcdq3J9EhAsktjOBg356nSgc4N8lEoVGhRti-MTpgw8tWUF1rU9jENFx_JcaQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJWUINuJUaasgT7Rw8EPswsvC7CHguRwV5y27NE6bkArHNouQ3qqtR4TCabeCFjPLzC1RnOsObsHa-UUzhjyH0jD-kP5-21cpQEinE9F26_HxKkStuu8Yt5gw-jQkAKMeEhDsF7EIXUKAJ6i2dZMqZNZYGhQlu2Qj7XrRwxp4nhLBZXhScHqrrA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAokl2EEl31Pbo6_Uxf_GJ0dyANYPKQ8_Ghr8xIDgeosXtZjTfQhbvuIaUbv0YFmVZQ3dWJsPQEzlJ2E7WimWE0sit5B0Tt1euGCAt5LC31UW65zlDWIZxT2SkyFIHBTItEhBZz4bHgakceWcooThL-0ATGhTU-9aGbht_GqXwQOgE-b0O0GG-bw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA2_hAWPQ4BhFJWOMTSyeH_pfl3BxGD3g2u-nstndW3iX3n8GeA4BCI8Qv2a3ExoR90PDY_Q7z2KYHaK7DX4sclv025US_zmPkfN6Ak0RhySbr7sCokiWYEDaqyya2m1miEhDnQRkJoZC_T1s5H2mn6tyqGhTYijoxfdL3dNBCJzf86KHEzzZPjA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAA0pTCq6OPp7iFcsQsyhfxA32C02I_FyehOvK8W8UmcXsB27G9LLLR3BSr0F19m7sbML2j3Yoq1URXCuTbUOt88m1xiPkIYtk5DvNmf7ygkQtUx1QPsCK6aoCl6BrPg1DEhA3aUddkoD9igkoWOyJ1z6zGhQLtVprXs322p0OnNzpuc1SY055gw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcoAcc30_Lw5qXgrh044KUH74U25l0e9Ky0tdkRS-ICAOmA9xGqUMJIcfz0ytGjxe2T7x7-9aIV4Y5C6OEyf_WJqMe3Q16AYhe_1cujQl1jEF1ZGhaLSVgzPazkE2AZyoEhB23nLWFzfWHM_YinnFupErGhRjr-OCtAf6IkmIMgwgG1R3BGg-ag&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.8,
                    "subcategory": "coffeeShops",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.48102900000001,-81.685921&markers=color:0x82CA75|41.48102900000001,-81.685921&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-05",
                            "name": "A.J. Rocco's",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJz8VKyID6MIgRLo_eferTmu0",
                            "phone": "(216) 861-8358",
                            "address": "816 Huron Rd E, Cleveland, OH 44115, USA",
                            "location": {
                                "lat": 41.498474,
                                "long": -81.6861464
                            },
                            "website": "http://www.ajroccos.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 7:00 AM – 10:00 PM",
                                    "Tuesday: 7:00 AM – 12:00 AM",
                                    "Wednesday: 7:00 AM – 12:00 AM",
                                    "Thursday: 7:00 AM – 12:00 AM",
                                    "Friday: 7:00 AM – 12:00 AM",
                                    "Saturday: 8:00 AM – 12:00 AM",
                                    "Sunday: 8:00 AM – 2:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0800"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Jimmy Lippitt",
                                    "author_url": "https://www.google.com/maps/contrib/107218674542481059411/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-39iKBh7Ru6U/AAAAAAAAAAI/AAAAAAAAJ7g/ni7dwIeZve8/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "4 months ago",
                                    "text": "Great food. Prepared as ordered. Quiet dining. Short wait for food from point of order. Waitress took great care of us. She deserved every penny of her 20% tip. Great prices. Large selection of entrees to choose from. Will return in future.",
                                    "time": 1518231462
                                },
                                {
                                    "author_name": "Brandon Trame",
                                    "author_url": "https://www.google.com/maps/contrib/113538902677203668161/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-TLc8X9EKsSw/AAAAAAAAAAI/AAAAAAAAUfY/C84lontriXM/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "2 months ago",
                                    "text": "Want some pizza? They have it. Want a pick-me-up? They have coffee. Want to grab a drink? Full bar. All in all a cool spot near the Q in downtown CLE.",
                                    "time": 1523158150
                                },
                                {
                                    "author_name": "John Dearborn",
                                    "author_url": "https://www.google.com/maps/contrib/100207376051546608234/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-ftQ3BJ-qjPs/AAAAAAAAAAI/AAAAAAAAAAA/ouOLM8ETIDU/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "4 months ago",
                                    "text": "Great food, great coffee that they make from their own roasted beans, and plenty of beers to choose from if coffee is not your thing. Go here instead of the Thirsty Parrot before games. They are in the same building oon the Huron side. Easy to get to the Q or the baseball park from there.",
                                    "time": 1517252286
                                },
                                {
                                    "author_name": "Chris cwall216",
                                    "author_url": "https://www.google.com/maps/contrib/116360026941237883331/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-2PGTORq8WWw/AAAAAAAAAAI/AAAAAAAADKk/LMsnwj47FN4/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "Awesome! They shave heads on St.paddys day and raise money for cancer. Great food and atmosphere.",
                                    "time": 1521864267
                                },
                                {
                                    "author_name": "Charles Ward",
                                    "author_url": "https://www.google.com/maps/contrib/113478850157836668904/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-yadF1UWd-UM/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3LHHrVaZj1p9TnYYdIEz0lxZVJsQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "9 months ago",
                                    "text": "Have only been there for coffee, so cannot comment on the food.  But the menu looks good and reasonably innovative, so will probably give it a go.  Coffee is very good and actually reasonable in price compared to most chain rip-off places.  Only one bartender/barista last time I went.  She was efficient but not particularly friendly.  Parking is an issue also due to location--very little in the way of street parking and the garages nearby are expensive dumps.  Not sure it is worth a special trip, but if you have other places to see or downtown to watch a game you could do worse.",
                                    "time": 1503404711
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAU9R-hmhK7xFzIBsDkTJgq7xPsm7N7foiujdxdyFszC_dqPCej_ICQx2Zthp_lspmt0mypqRzPGQyGYbZYxj9F2qgMhysqtzQ-YyhdSSsXg0yzA9QNGpHLY61hCRT0FiAEhA8AYNm88QyYRLC_8TbYWG0GhTuwgYry9xUqTDzQ9jhqmkPvZjbWw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAMN6iEg4re3gDoXMGbD41xMstQ5PMAGDEPYGLcRDu6-9Fb3gn8rwL588qmN_mJ68P5nBTWuGG3ayseZJusMFIYTvn0zV1p0O0c1cJDG19XBgnYjg5AP_0Yc7MXm8t2CXpEhCAaoKSuVn9aQGUt9ruTOarGhSmA98WcU_ViT10YiUJIxbY3zjenA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAo-jK6tDFqVNnH1go9Ovm1OnShiOjpRGo8XBElLXKf55UhSoNYuTTnpqunBl5KPb38uHcMKGMkeBLGJYraN3zDlFBaKDnbgsVhv4gM3NrMa_FycfLQt1Wcy3AbskhFS9jEhBjyu2-TfLo9BCfc61IZfghGhQ4dfinc1H3TZHQ47Oy4S_kWhMCqw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAbfZwazEeCT_vB5ZCgBRKlp8HVWfnNfNzHPMhKKX_pme38XQz_ymQUWG9_pQB-nJzm1AhNgpROQVY9Y3v-Ww9peSEi4p7NLUmfs6sxHWa9fLXravhZCh0mN77z0V1q45qEhBkMqyDJeBqa6MmgPDP6F5VGhQxXCJDYARSM8DSzxtgfCb9V-TnUg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAaJ6PTOX9mixvgYmKuE9iqbxq5_Br4rXWydbNHawMNdgEOtIgaAx1qkHZTp7H6toN79L-jCylTOElcwTapdfga1N4NoKJEYNwnu9GlZXr9E1uymZH6vth4getJs2ZZ-yTEhDNrYGNG9fD_kK-BYpwzuH0GhQnLXNdEkipWxvPW9fJPL13edpN3g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAavhAMAPZUHA_HB9kExVfyHh68hiVGuHzw9nQEWQq6LAM6NBvfY-2TM_ninLeRPeuUqkuAMP3GWSzTZrIqqLm-DCNMrdOnA-oX0c7fQfOnQ6OhsAeE2LbNFDdKpNeRvDfEhAI5fTyjWiU44ZZn1g-742zGhQ7PbjAa0twHlxmmt6CfJ2jmhRv9Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAhcJzVDottT1ElLF-WqnclXmDWiKw2lnlDwalvFRXyfMLyOFA5kyruLDEVlcARghGmKr6KUocrEeVBYvgpZ1ryOLY4QrO24pwy22iDmQtGiJ2UJ4dTnDSydfYLom6NA7VEhC8MnrEH9wQ8oY0Nygty8C-GhSJZA5Vpivtw5RCaHzwVzOeD-K24A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAD-qJmJX6vexJrCImm4opThuC4vA97UNAa-VCqiv8Vc6RbITYNgCkj5XZr7JvWHKFAaMtN5tQbm7wy1kT2ML0un42spOt1LyqgOHQExggqDGT56kKWGGfQJJhYjqutnIXEhB0biFDy__-hjqHkQUrVCfeGhRTfBTNxFUEEcO1FvFYKj8GQnjBdA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAKDKIl8Fb1JSGhLx9IavGvMC-oN8dtGF01FHaLe1qxGFnezmFUnJi7jhVNxF5jx-HIxuw9_Wy2rewcZsksxHKDF9aRr6FR26Y7ziRPN1aMIP3w_mQ8jami_kL_W-PeK0xEhA3SmhEeJ43pW44un_a4T1IGhQfxPCtZ9S2rjj65m3fLI8HUzK5KA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAW6BLQmzdZYu9bpMy9AlS5X2_7QC_N0e12AMRbXwj3MqCY_gZsE4R1wdU45e2ZiLrZG8ERQiTMTYe-yV6Y22IOimmVxRB1CcIZ_yJXYH4YyTyCCMiyWshokzgCc3MXm08EhA9667wCTkxx0dSa0BnewK8GhS0UW56YrbvtdllIcNEpksqgpf3VA&maxwidth=400"
                            ],
                            "rating": 4.7,
                            "category": "food",
                            "subcategory": "coffeeShops",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.498474,-81.6861464&markers=color:0x82CA75|41.498474,-81.6861464&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-05",
                            "name": "Bill's Coffee Shop",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJrwkeZN39MIgRfi7pk5bQxjQ",
                            "phone": "(216) 381-6443",
                            "address": "3954 Mayfield Rd, Cleveland, OH 44121, USA",
                            "location": {
                                "lat": 41.52057689999999,
                                "long": -81.538136
                            },
                            "hours": {
                                "formattedHours": [
                                    "Monday: Closed",
                                    "Tuesday: 7:00 AM – 2:00 PM",
                                    "Wednesday: 7:00 AM – 2:00 PM",
                                    "Thursday: 7:00 AM – 2:00 PM",
                                    "Friday: 7:00 AM – 2:00 PM",
                                    "Saturday: 7:00 AM – 2:00 PM",
                                    "Sunday: 8:00 AM – 1:30 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1330"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0700"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "P Price",
                                    "author_url": "https://www.google.com/maps/contrib/117562016801574380963/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-ELjuQvFGN7Q/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1brHYFiazdXK5sEJhL5IGtJU5u9w/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "4 months ago",
                                    "text": "I have loved this place for years. I live very close to it so we enjoy it for breakfast often. The owner, waitstaff and cooks are all so friendly and like family. They greet me by my first name all the time!! The food is excellent and reasonably priced!",
                                    "time": 1516188702
                                },
                                {
                                    "author_name": "Jamerra Williams",
                                    "author_url": "https://www.google.com/maps/contrib/106394613522513948670/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-4qVVPeIu00o/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2q0kevTC8R8aQyVwcrC_TRHbJAnQ/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "4 months ago",
                                    "text": "Wonderful food. It has great service. I would give it 50 stars if I could. One word AMAZINGGGGG",
                                    "time": 1517171951
                                },
                                {
                                    "author_name": "Mitzi Segall",
                                    "author_url": "https://www.google.com/maps/contrib/115633441105172977760/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-m1aakbT9nio/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3ug74Pukzg9tWjvkq5NTsFHPPiJw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Our favorite neighborly \"hangout\" and, of course, restaurant for down-at-home meals!!",
                                    "time": 1524948025
                                },
                                {
                                    "author_name": "Dale Simmons",
                                    "author_url": "https://www.google.com/maps/contrib/111608172377334524387/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-c5pBq-nfvp4/AAAAAAAAAAI/AAAAAAAAABg/vnfjF1DCaHw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "5 months ago",
                                    "text": "A classic hole-in-the wall diner with friendly staff serving comfort food at very reasonable prices. It's been bustling every time I have gone but we have always been able to sit down right away.",
                                    "time": 1513776875
                                },
                                {
                                    "author_name": "De'Borah H",
                                    "author_url": "https://www.google.com/maps/contrib/101212249380911878772/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-xDTFa5yb-Ms/AAAAAAAAAAI/AAAAAAAAC8I/bJFHR8wWh0E/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "2 months ago",
                                    "text": "Coffee was hot and good.. Customer service was pleasant..",
                                    "time": 1523679927
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAESMRL_NuWZ0xYjaXM5vhwPrW_MU9XZR8p4hVIYdB5YuLf_LWIUwGc9FOm3YRG9YCOlpsWbvD9o_eKNdqRLev1I-6ZbmbUUPSzFYWY9X-M5C0aykHXDSHUaIiC0s_ACpSEhAYw8fh09u3ipgyV3Yd_pRSGhRxtmRRaNV6ohkPdhqKj0YMX1tyBw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAW9vdTZs_vXQQO0aQUDSOwNf3YIXGz_y9fpQWEcMmvkW4VXQUMyZ3dXGp0EWXsvm6C33t5WM131bJT9VIEONyUSWxy6ebmTGXpXtwOdhiiQgQ99T0GQiOjnfBiUcR8b0HEhAadORLxiJ0dItSNf5180E5GhSGRtduXfFmn8S4EcTwtPvGp-xqwg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA_zq7C7g6mFr6ggNvOc7Y5F-YF8Fq4C_1xmTbdOepdPZepu9kGIVoA_P1r5-5rupteBB5y4BFxO9zmPR3XKDlKzU8YkxmvgBYS__RwKhEJrhOnQily2jP8DEWxUGxJ63iEhDoqFUKFtzx2QwFeRV59TNnGhTjB3N8iV-O2vJq-jcUnBNxLsmoaw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA3PXKWjVsBr4kWjXCGfzt5mpwqQTUBDe6PcehEA00KS3sSpJPtbsf0HJAssBU0qoEvbVYHqqYiFlvxDJQBQ4YzPnaZ7cXhJ48KjkTaIEDElC_2As5DSOCRhrUaR6rmiaXEhCfoEkq-zS-9NPKSdOlOUhQGhQNhFxOcpCaAEQS4qMdtr0zlRUlAw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArE6ARfpWvGIBbAsUA3rVAj2AXDjXfyskUK12ixPDT5eeNtvETOhXJDjrbU3MwNxZc4f_iQ4zDjyV1Ld3TXHeA_vZgi3jtltuDCLCORkjBkShsMRgF50L4Jqq8V0Mf3e9EhDqXugw5Mw12rtT-MGeAlaxGhSJeAXTR805ffpgTOEHSWquDFmgDA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA6v07lJoUPDC-tCDjQXYomK0fSK-t8Iwsy4wkMrY_2ZM7P1h7K09lhltJo_RSuDSDTZj0pl3SzzrqKKjNe8O0TV5YHTzkg0cJtKTTuPvv6AwhVm_Qhp2Nz1UKMQnjyZUlEhBOz7RnBlLNbunanhs2BVCJGhQJajC6NgYSD7qTUGZvdP_VnE_wRw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA_qxCJi55U4f4rpieKmScLvIcDsJG1_TpPZwFfFanuJUDndr6TirHHmNcf6EYs_PuBV7xVqGzZnEIAebXJFuKzUoey73IpcgiMsitVKAFDW6_tGNW19bbEYR4iN6WOqhoEhC6ee5ZE5vEZPdl1Gyypdl-GhQA2YnOD8TditrivtomUsHa8IUpGQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAASA31w550GzydmrRavIDzz5dGOVnyUN9c5lj7sNiJ7BSlX1piElkp30lDkEYVSI4fVzaHh47-67benvn73RyvF9PiGxqna9oPHm3Qginxc3FgnSIHmGLwNu-1JOKNrIzGEhCxxpt9f42RUiVvFuEWGRTvGhQn3heN-WyrNGbKBRkzuMBh7FKzGw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtgJc14XF3_kyA2UByaJ4LTR49ILovIkjIlg7OVSkSwgGi_g7Tg-PO9etEdAY3BfvUIuLINcvaehX9CzrTmbLRZREv4z6Cv6UR_jPg_De8dAT7u_13HLJ22CrvlZtxom2EhA0ezcRwk3x7FxCq8czuBu4GhQmQ8H3ccGw_ncfkWWj8hPhTjhtiQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXFmGxU_6zwChS04HYzsKhCoIAQ6ar7MBuX3lWEMEwBn815FC6l7VznsVtpeCw_8N20JF9Gfih7rDfiNdmsj6iC6RmnId6j0NWD5cSFIPBZ3tBqLh8K7Fg4_ow3RJT-HVEhC_e_34kRbYnBdxUQlZfVL-GhSr3Fc1jiDPX_ZNyQkRWiOwtbpvHw&maxwidth=400"
                            ],
                            "price": 1,
                            "rating": 4.3,
                            "category": "food",
                            "subcategory": "coffeeShops",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.52057689999999,-81.538136&markers=color:0x82CA75|41.52057689999999,-81.538136&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-05",
                    "name": "Market Avenue Wine Bar",
                    "category": "night",
                    "startTime": "06:45 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJccmXrW3wMIgRbe0WpmRMzlc",
                    "phone": "(216) 696-9463",
                    "address": "2521 Market Ave, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.4841682,
                        "long": -81.70428749999999
                    },
                    "website": "http://marketavenue.wine/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 4:00 PM – 12:00 AM",
                            "Tuesday: 4:00 PM – 12:00 AM",
                            "Wednesday: 4:00 PM – 12:00 AM",
                            "Thursday: 4:00 PM – 1:00 AM",
                            "Friday: 4:00 PM – 1:00 AM",
                            "Saturday: 2:30 PM – 1:00 AM",
                            "Sunday: 4:00 PM – 12:00 AM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 1,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "0100"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "0100"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 0,
                                    "time": "0100"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1430"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Danielle McKay",
                            "author_url": "https://www.google.com/maps/contrib/101838514658789379930/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-Nd4uDmX4tFg/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0sreG3Gb7jodUsSQYZAITyZCH1GA/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "3 weeks ago",
                            "text": "I most enjoy the consistency. I've patronized the Market Avenue Wine Bar at all times of the day and night, and all seasons. The service is impeccable. My favs are available as well there is always something new to try.",
                            "time": 1526678834
                        },
                        {
                            "author_name": "Ithaca Court",
                            "author_url": "https://www.google.com/maps/contrib/108729380415662312540/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-ToTqXdTSjKo/AAAAAAAAAAI/AAAAAAAAmpo/dBDSZGLcLHw/s128-c0x00000000-cc-rp-mo-ba6/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "3 months ago",
                            "text": "I once brought a date here who called this place 'perfect'. And I was on a first date, and she was smart and lovely and the night was perfect. But despite all that, we didn't click, and after I walked her to her car later that night, I called the girl I did click with and we're still together 9 years later. This little wine bar is magic to me, because it was able to define how even if the atmosphere and environment is everything you could want, it is most important to be sure of what's inside.",
                            "time": 1519385107
                        },
                        {
                            "author_name": "Kevin Barnard",
                            "author_url": "https://www.google.com/maps/contrib/106362637594847883078/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-a2MsLasA1p8/AAAAAAAAAAI/AAAAAAAAACs/QBRylFjBchc/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "Great wine selection. We had some tasty  hors d'oeuvres including grape leaves and olives, a nice bottle of barbera and peaceful atmosphere. Great service too",
                            "time": 1521378927
                        },
                        {
                            "author_name": "Jose Padilla",
                            "author_url": "https://www.google.com/maps/contrib/108544193194109599221/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-ZLrZoV81t4A/AAAAAAAAAAI/AAAAAAAAABg/KPAXy3TuNbY/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a month ago",
                            "text": "Very good service.  I was visiting family, they took me here.",
                            "time": 1526040609
                        },
                        {
                            "author_name": "Barbara Gifford",
                            "author_url": "https://www.google.com/maps/contrib/114947623624625858955/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-zey1jYfiFGU/AAAAAAAAAAI/AAAAAAAAE3Q/cgAJyElOtyU/s128-c0x00000000-cc-rp-mo-ba6/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "5 months ago",
                            "text": "A cozy spot with great food, service, and drink options. We’re looking forward to stopping in again.",
                            "time": 1514531261
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjfVtqiquj5-ZNML5IvMmiit3-UUM3e60v9UimCiwyJK0yp6mPbpUK4YuC-ihhy-G5b6szn8ALiVBv2h4I9VxTLywX-fJsMon2fJkmiG8mcddEXCiizSfiRnU9KM9gUUSEhARvx7TlEz8ZlxgXCA-wQ51GhSKORD7MZ1hWyhQeKn6JFnwb5tRlw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPQ9-1colnJEK93y47FPE2K7UWVtJo4MKztOEu4REKqbw0TPECH0A_9vLk6wn96zYkBuvXrzb4Ds7pZbnxuvybiZ_lkjicfcDKGYHl2i_7KSbX2-ECIqfDZ5mV60NWv6lEhBCh6apYK6R7GxAhsMrvLx2GhR2L2bBiMZf3stfYW0q09OyjF_Gag&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA50gfwyeNZzGVpM7jQdedKR6BJDt8M2pkJaL670c1wyrusGdCgcKrgy8J44QA-pcR39g4R_alLLh--VVpZMWl4Fk9VBJRd-MW1upMe58JqM0cameZy6MVfF6EgwstHgZTEhAbiau7A5tJ0p5hvqOWpmmOGhRnCKl9upptafDNsRn2W9Bq23xfWw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAn-33kmVFpdeB4ioGedCqCZeRbmyc7RDQipPV9iSjjq5CQfiT9gzKVrhcPw5aNfiOkhMkWh_x3LitGRnBtAcTsBaN3gLjMgK9HZ4NUZUynC3STiKq69lnbO2hbL8Ji2p9EhAhEs-MmhhipWNpBburGr3dGhTcGIjAcmZ5KCmZE-oVz7-Ka68R0A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWkxMaH30jlbU0Eatj46UMbZaQeGbsUBnBdLnBoWuk787iBlTJcl93FaJ5fGh81_86V0aKSbwbp9dNRhbHVMT8Si_HurtF1M74F5xGHbDys7aJkunkBw_zLsgcgJwRgr9EhDGeUH9AV478qRZRb3yNiTbGhQKE-H5P2L2JvVY6Leu2hLOyZbp_Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4LU_rcoBBeHN8IYmQNRuxx3XfaVZSdT5egv8d9S9ziXoTq45RHdvrmzRnw5XbKP7OEtrqciXlEMd4q7CNY-fo8L_J74KLyj_3E9XpgFoxHDze1MCsROBW9bYjRve9nimEhBKnL1a1sAiRDGVTV8I3RInGhTS3uLkdC_9QYOZz6iUNFjFpbKSxA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXq-49B_YJnFnJuiCbpFC7jmh-TVcGE_IdUF_dQ9NnAJcvlmXs8PECpC9DvXODloAsNJx8gsjg6m-IbkjB4prgJc31eumxAwQm6XVC-m8B4Zpe9ELo--3XnnuGy4tnefOEhBckvMwLJyVQVNW2Ote4KrhGhSoRl52DAPZ_Rv0hx0AUpRRybMhCw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA93RuwIPwJghsWbQKr4I5WEHkwsgbe0uglrMi4DUTXwQ7lLt2uWxIeQ6dRbYQ5KFJzjWD1f2ALJ2GL5D9UP9y_FAdbOqgNLilUfw4LrTKWeYqKQnD236HuyBdV-IdoD8QEhDpynVtdjdj38J_zWqnXz5mGhQeuKaad4TMX2AZBdIzT4TnmcFUqw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4iMM9QgQhRax6FYQKv4Y0JBkwcKvrMcmA2rDT9iZaph0Rqr1nN5XvjXpFZIccA3PsLd_6RItimUSZMLjPgxt5mIxuhEUAeSUSsh3-u80gZReU1JB6mL0ma60DBn_dsC5EhAbljYlmTVuq2P7gk2MIyUDGhQbDtco37PaSjcrl3n_FRk_T9GRbQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlWwQHNZEAVXux8Oz3fQNwWlBJP6W5o_qXUfxxlvu4ZcWy3MWVIRkmA9kKtkq6sMhEURFqF30xCdTSy-GvadVDfPl2ZOEgAEpR8Kp9XWveaRnavR3gSI-c4QH6taYCV_MEhBvUp5wZmSRYQOEDAP_IFAiGhRRWQMfyfloIu7BbhxwNhzLeDcv3Q&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.7,
                    "subcategory": "partybars",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4841682,-81.70428749999999&markers=color:0x82CA75|41.4841682,-81.70428749999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-05",
                            "name": "Johnny's Bar on Fulton",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJQ9peXhnwMIgRd7ssGrhmkU4",
                            "phone": "(216) 281-0055",
                            "address": "3164 Fulton Rd, Cleveland, OH 44109, USA",
                            "location": {
                                "lat": 41.4677738,
                                "long": -81.70770519999999
                            },
                            "website": "http://www.johnnysonfulton.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 5:00 – 10:00 PM",
                                    "Tuesday: 5:00 – 10:00 PM",
                                    "Wednesday: 5:00 – 10:00 PM",
                                    "Thursday: 11:30 AM – 10:00 PM",
                                    "Friday: 11:30 AM – 11:00 PM",
                                    "Saturday: 4:00 – 11:00 PM",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1600"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Elite Photobooths",
                                    "author_url": "https://www.google.com/maps/contrib/118410367743036251898/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-__NomJ52Rk0/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3WTPoNc-18x_pbXU5clPJ7WX60Cg/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "Wow. Since the first time I walked through the door here I knew I was home. From the dark wood to the welcoming host/owner Bo, this place has got it all. The wine list is impressive and reasonably priced. The food is out of this world. I had the grilled long bone veal chop and I have had many dreams about it since. The bartender really knows what he's doing as my old fashioned was the best I have ever had. Service was impeccable and impressive. The appetizers and pasta course were served French style with ease and elegance which is a very nice old school touch. I could go on but let me just say that this is somewhere you have got to try at least once, you will not be disappointed.",
                                    "time": 1520029336
                                },
                                {
                                    "author_name": "Craig Tower",
                                    "author_url": "https://www.google.com/maps/contrib/101640024977618516760/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-5cWcYBM0ydo/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1hPS4w8cJ7YR15GzEd3_JdjqNMNw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "2 months ago",
                                    "text": "Johnny's on Fulton is a Cleveland classic. I went here again recently with my parents after nearly 20 years and it took us all back, in a good way.  So while this is an old Italian place, they really specialize in fine dining but without pretense - when I was there with my parents on a recent Friday night over 20 years after our last visit, the clientele was diverse with lots of suits, but also a guy in jeans and a camoflage t-shirt on a date with his wife.  The food is very good and while the wine list offers lots of high-end bottles, you can also find unusual selections in a more modest range (particularly from Italian producers). Would love to go again!",
                                    "time": 1521645851
                                },
                                {
                                    "author_name": "Lisa Urgo",
                                    "author_url": "https://www.google.com/maps/contrib/103580882002702830295/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-RF_RD2KuUIQ/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0f4rpGvs7cdA7nBcdgK2XRbcw9DQ/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "We went to Johhny's on an early  balmy winter weeknight - and had a heavenly meal - From the service to the eclectic music on the sound system  (different every night) to the romantic vibe and scrumptious food and wine,  it was a perfect evening.  You can't go wrong at Johnny's which is why it's a classic go to in Little Italy.  Try the veal - could be the best you ever have!",
                                    "time": 1520516672
                                },
                                {
                                    "author_name": "Megan Studzenski",
                                    "author_url": "https://www.google.com/maps/contrib/113280331562883691080/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-UWR5PJLLH2k/AAAAAAAAAAI/AAAAAAAAAnI/SdmOq46xJ6Q/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 weeks ago",
                                    "text": "Best tiramisu of my life.  Killer drinks, friendly and welcoming staff, and they somehow turned a simple salad into something excellent.",
                                    "time": 1527690301
                                },
                                {
                                    "author_name": "Beth Finn",
                                    "author_url": "https://www.google.com/maps/contrib/106904956897610827106/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-gX-4qkztSvA/AAAAAAAAAAI/AAAAAAAAAGE/cq9rGzzx2Js/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Service was awesome thank you Kelly and Tony. Entrees were awesome and topped the meal off with Bananas Foster 💛💛💛😍.",
                                    "time": 1526343320
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAohWrun9-h5sXwJpvWZ60ZW7SnGSJ2bh27quPdrc4qWKJG3VDq7-QgQ8_NdfRslnx17ZLu2pbW88xUNBiK2BqIfkavFliHg9FNYKaKbFZalK7js_nua-VzUmBQXil6VmQEhDhMOy8mp_BcfQ4itD5QTkDGhRZyAUpAZuPpUJeX8Scxhl0gIX9Eg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4LqImyYFmSYmaeG1iqI7m_XT3mUtYYMgAWMmF-cEQjq_7vemErq-XyBFgXEZXcVKmDYWbQdBQumLCqCJQVIswPdjddfyBxl8-3re9DRcKkpUxZHLQ6BufQ1FjLiHSKFKEhD0DFeMBy5IFmYEws7clw6gGhQPrR_HFUDmkQTxvuI2nhZY4TnKXw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEw8BL_GIBPPDDkiPODmqC6LOgPpuSfNUHdakJRMIVeHscVRIjjUjOXSd1vglXAr6r3bc3rz6OigA75d5XZosfnv59NUH_ujBj838RQwSxocexVRk7q6Y08a9GvxZeXbtEhCFpo6zyS0YhOePGI5LbboZGhQK07d1q4F148PHOrQXF3lOEHhdUA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADk_DZbS-5SJRFp6rOaS8S3UkNkYcyf4JtUik_6hU9m3Dr6yemy6O4LMjdJViIyQndTJ6ez2bjUM0QAam7oaB51QVJ-DA95IQIUqhV3Jr6q1XDYWapTWTuaIv4LmQARHjEhDIG37af7kX3d-3TKr07mDSGhSqxgztU-CEwIvOAhhr6_gLTKv42Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAALnstZ9nXS9zEXPm0KqdZ-PCazcJiCWD7h_Od65wsUohcT5o7HPLY1xyLz_pVUP8vm7JbcCkzWAqROXsq5kxLG8-nsuGCJ6ueFkY6KI1CQgldt0mNJ8PvHK5rr07LhLeoEhBv6W-hii8mjn74DU7sZHsOGhRIu8cRHmwZRLvVS77P7M_l9ML88A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPizBNGNFsqBJ1eWh9Q5Dx32pe3gW-TMZvZtOTaCBertAGgm3L19Yu8OFZeYUckdjW8OVS5QJ4u9P5I1t_GTe8qn-YxRMkYr-OmxW_VvK0a1_NTIBy4hV6bkilmxRw5DGEhCpY9jxYcKhpo2qZHDhC75HGhTmtMukaCgvgPbG8VXhg5pj91q6Jw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAxU4DjN_C5pfJ0dHwoD0uqS7tJP3TZyyXIQ_TMWjf5zASE71tLsIBqhPNAVbnV7-pK-4QJRgOYY3MBeIj-tGJxaSbLbdI8KevX3DdgfAT5A_h4XoNnSP3iJF_H8FcCsuFEhCZ8zQbHYH5lFxpMV2m5JEqGhRKkb__RBpQ7-XanParUMTGiOakMA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA6qJppb_tTDP6VOTi-AEn13_mJ626Tlcm0H3NjjaDxlpd-vcg-ZOP599C_PDw7Lv6rMIIoFNJotzuhaHxmjUyJvtDfuY9jQ4s7qcfccW7ogWHHqqhDzQbEFwv21V-24LdEhABZRWj_Brxc819M3i3PVeDGhSrN_CaWib4aRgcZVuDMPr_xnG1hQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuZ3KbwyGEVNnY8czKmJlrXaVbvvaMph9a_LMleLI42KLwxheDAO3GFdZMlfDSWHgRp5PuKMr3S-rRgXmWlTjMrAOVP0CwZhYCcwyKOndKLWt65NzGx6oIICg5GvLXi3EEhDS07YtxhjNl2mG_4Yi1nN3GhS9Z-3nmuh9kb4CwSQmvrNt4-lR4Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAIrb_i8HstqnwCJD8AEMRgktNRjrOUp2c_inGy2mKkZ8XdIZ9w79WCsqtTxlk63aUsO774GBAoOieO_KNF7jUrdZwFqIvbRy472rTwmeyun2JEHi9Ir9da5JCvRCN_JTEhBPio3eR5NgbIJpmUHwlshXGhTdJMSmyVPAtweorEy-KnNfhx5GjA&maxwidth=400"
                            ],
                            "price": 3,
                            "rating": 4.5,
                            "category": "night",
                            "subcategory": "partybars",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4677738,-81.70770519999999&markers=color:0x82CA75|41.4677738,-81.70770519999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-05",
                            "name": "The Black Pig",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJ9bCR023wMIgRoXcdCrxKF-g",
                            "phone": "(216) 862-7551",
                            "address": "2801 Bridge Ave, Cleveland, OH 44113, USA",
                            "location": {
                                "lat": 41.4849405,
                                "long": -81.70673149999999
                            },
                            "website": "http://www.blackpigcle.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: Closed",
                                    "Tuesday: 4:00 – 10:00 PM",
                                    "Wednesday: 4:00 – 10:00 PM",
                                    "Thursday: 4:00 – 10:00 PM",
                                    "Friday: 4:00 – 11:00 PM",
                                    "Saturday: 11:00 AM – 2:00 PM, 5:00 – 11:00 PM",
                                    "Sunday: 11:00 AM – 3:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1500"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1700"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "tod doeh",
                                    "author_url": "https://www.google.com/maps/contrib/104527070554514549812/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-XbmmfAg58SY/AAAAAAAAAAI/AAAAAAAAERI/LGWldT1JQyc/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Food was fantastic. Best pork I've had in Cleveland and on par with NYC, or even better. The pork belly was astonishing. Not just the perfect pork, but also the preparation and accompanying vegs and sauce. The mussels were very good, not a single closed one, fresh. Could have used just a pinch-and-a-half more salt. Burger was very good. Perfect medium, almost medium rare (which is how I like it too). Could have used a bit more outside char/burn. OH, and the bun was THE RIGHT BUN! That perfect soft inside, with a thin but strong crust.\n\nOverall I give this a 4.6 - Cleveland and 4.3 - NY perspective, just because service was very slow (we waited 30 min just for our drinks). But food and friendly staff made up for that. They were very busy. We weren't in any rush anyway. Would have been a NY 5 if we had drinks earlier.",
                                    "time": 1526231991
                                },
                                {
                                    "author_name": "Kayla Costanzo",
                                    "author_url": "https://www.google.com/maps/contrib/105172375533866794841/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-1pohNSRkIKM/AAAAAAAAAAI/AAAAAAAAABc/ZHxC-pV-9Mo/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "Incredibly delicious food and drinks. The fingerling potatoes were the absolute best potatoes we have ever had and my pork collar 2as more tender and soft than butter.. outstanding.",
                                    "time": 1528590869
                                },
                                {
                                    "author_name": "Christopher Towe",
                                    "author_url": "https://www.google.com/maps/contrib/109591415643874407926/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-QNybdZ7XsUs/AAAAAAAAAAI/AAAAAAAAQrE/ZeoqX4xt8GQ/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "Showed up during a crowded brunch service without reservations. They \"created\" a table for us and our toddlers. Then they provided Legos for them to play with while we waited for our meal. The food was excellent: well cooked, appropriately seasoned, attractive plating. Overall an excellent experience - definitely looking forward to another visit",
                                    "time": 1522604246
                                },
                                {
                                    "author_name": "Kenneth Wilson",
                                    "author_url": "https://www.google.com/maps/contrib/115573211394404393799/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-9B7VKFXvsJM/AAAAAAAAAAI/AAAAAAAAAAQ/cvEbcsnylfo/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Very cozy place to eat. The atmosphere is great and I really enjoyed the appetizer and my pork chops. Highly recommend for a date night.",
                                    "time": 1525022294
                                },
                                {
                                    "author_name": "Mike LoBue",
                                    "author_url": "https://www.google.com/maps/contrib/118373388943612578126/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-necyZ-eYOBM/AAAAAAAAAAI/AAAAAAAAAyw/1ofNL9-7LcU/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Great brunch spot.  Can't wait to go back for a dinner and drinks! Great food in an awesome setting in Ohio City.",
                                    "time": 1526121786
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQBNqj_JNLaFXIlo-dFLceJxC_QoDngcbaG-g4wW2H1_8ka4piQA4a_sK1r4pY1vrye8B7J-ppCxuVVUONHHiGew04MaAXomhkLmC5QwUODOjE88Uo3AP0naDufFJeLvlEhA7fxTHlzF5lKrR3Hci6kanGhS4Ty1szkwLpx8rfPBGT950Z8xRfw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARedflxnABcoDmv1FScK0bh5pWouWx_qqF8Q961vi-he1D5A85LNem6cuH2ZSyq3MXyD2U_tPOLEzNuem9HwQvWw0swt0CoqhlwWRal25N5ZKUeVPnusio_7m6bvybJU8EhB0fGnepOl6ced8FgtCubM1GhQe14YaODwxRQexrEeYYgrFgMxa6Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEvXXqaKM3FIQWgegy2weIQKKu7Vsamv4Wtu9G5Z8KPU6KbDQdOdvUpLGM1Pngyb7ravPhZ-Zpj686rs9NTz6L3QtT5X-Y_ImtDLew04YUTTZwmMzLT-TUf-w9UcLH1jiEhByKCvQrAJoj-BDYyfNdaa0GhQpJ6sZqxpdJCg8Svu8AhxnGyIqUQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA0JX5cbNzaa0tN8Xa4ZcYkX-8yIWxaUlnUloqddTrc3EuwiCSaKwyMlnYvxKLlg7y0EW31fusGuFGm6yoJWYDEP54aLJuLxI_LoPs1sJjj03g2FNtlaKYcJM2bSC6SIGLEhBzG4P_IlUXWl0VmCsiS_GcGhQ7ONtuyURKDoXjqwAukxXBEYrhjQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAfWPpWNwp50rV8YPrIEqa6AaQyYsT59UIpxSenl1Jq1KRB8GPPIrgFQ5Rd5abf05ex39sMQFJZXEFEDWYWdKuxBs_Fx2AhTM627VHI-072nvz7oJOrXVc_t88PSKyILi9EhCGCOxIMewjX5foR8iIdoBWGhRIAOwgUmXi86lqac4aM2ziRpVKcw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5Sq5hjqsrCwExAdJS42fdK1YFEiZ331PT8lTxVlNLjP71XPx0AIFtvM-bvOWonrXG0p2MRtX_OObnyDzSf4m5uEar2AznRooFyraAGMar4PDxk8z5m0E5HEMs_gOjTXsEhBZCc6ZObH1w6rTnO91KcqdGhTlT7RwTU--ovSRu6uK2i1Qb7Freg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAhUVqPpsYiytx84VdKH-8kyBsDCKTYym7xgI6jGWF82ZTeZJt7x0w0rtp_mK_TVZihgsqkQ6M4B78-v3WETXkULtXhRHyJnZAg3E-HVRcEDVyCCpNM2xofoSB4VF_YQSQEhCAg_MA1sxYbOSaZ2huaifDGhQ4e5muDwuQadBBQ5wkcZLhsTYR5w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWTZmK5Ak9giYnJHltB3Nipc2WPQj4n0NY30GZ2Z1z923wkOE3MqUDS7f6bvNRUuqpuBNOS1IE5owV9mCOU5SJnfmu9sUuu_ID5k9w8y4CrBtm0SyFC8jsA3RTbo-X7yNEhAHt2eGGmauglDAeQEIneYuGhSPCK70y9L3vY7EW2V2d2wUZRzuWg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATdZ8RmC2UzHriRcNZraPXeyLJDL2VzeR7ZUCNA3gGl-djts83kGSUDQq-EgWQoIR2y_YgqAaRV5ogBTihGAplbFmlp5i_pYgmeLfPKWCR0fJn-SZ3SotX-TRmcesTkJoEhAQSqrE4TEv51MUm_8hxizcGhT1UdVenLLkQJhKUdhUuOTHrJDPBA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArlOLv80XP-vhBg3nqq9-wZf4zPLMlKZHfusmVn-8iAgmenYxcxj4Px3Y9EFLT_NfOshm7sdD5JkK3jZ_MGFur76w_iJIJ2leGLziW-hOAyGEPiNJqrNXDE5K80uXRUKmEhBPbJ3Ni86_ezaQdyJbuNE5GhQ89-mqT2YIccu1zWPrGP-v8UY8wA&maxwidth=400"
                            ],
                            "price": 2,
                            "rating": 4.7,
                            "category": "night",
                            "subcategory": "partybars",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4849405,-81.70673149999999&markers=color:0x82CA75|41.4849405,-81.70673149999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-05",
                    "name": "CSU Dept of Theatre and Dance",
                    "category": "night",
                    "startTime": "08:30 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJ8wE862b6MIgRSq6HvbZbkjU",
                    "phone": "(216) 687-2113",
                    "address": "1901 E 13th St, Cleveland, OH 44114, USA",
                    "location": {
                        "lat": 41.50193429999999,
                        "long": -81.682772
                    },
                    "website": "http://www.csuohio.edu/theatre",
                    "hours": {
                        "formattedHours": [
                            "Monday: 8:00 AM – 5:00 PM",
                            "Tuesday: 8:00 AM – 5:00 PM",
                            "Wednesday: 8:00 AM – 5:00 PM",
                            "Thursday: 8:00 AM – 5:00 PM",
                            "Friday: 8:00 AM – 5:00 PM",
                            "Saturday: Closed",
                            "Sunday: Closed"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 1,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0800"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Amber J",
                            "author_url": "https://www.google.com/maps/contrib/114269367493644914194/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-vPVZbBbMDK8/AAAAAAAAAAI/AAAAAAAAAFg/0Xluff_dmiY/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "3 months ago",
                            "text": "Great shows, great department",
                            "time": 1520693922
                        },
                        {
                            "author_name": "Ceola Wallace",
                            "author_url": "https://www.google.com/maps/contrib/111398828125101795886/reviews",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-q6Ce8FQuJN8/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2g2TaGeA0PrfBkU9GLPnF-xiSeRQ/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a week ago",
                            "text": "",
                            "time": 1528038458
                        },
                        {
                            "author_name": "eric wloszek",
                            "author_url": "https://www.google.com/maps/contrib/114875552187291334707/reviews",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-5uWNmBfnUoo/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2xtPyL_20hBJM6BMAypHQ9cgeOfw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "4 months ago",
                            "text": "",
                            "time": 1518203847
                        },
                        {
                            "author_name": "Amanda Jurack",
                            "author_url": "https://www.google.com/maps/contrib/116904307393921793574/reviews",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-yk2ksgrXo1k/AAAAAAAAAAI/AAAAAAAAh6Q/h2QTDNlbtgU/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "2 years ago",
                            "text": "",
                            "time": 1461322681
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAACJuShP7dR44_2N1B48FIlQOKVucsXtv_NvNWPm2aHAMYv_WnSCiPt6wj7Sn_p0u2ytYIqfdECH3dS2jikm1egil86hwDl80LxQmCx8QlzthUhaJpiifR-wuL6XYmvj_eEhD-gGHAh42hgc6Ys8bzosIAGhSRotaK_-nZqiNZs3K1Ic1hiQSbxw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlC6x5Oma4I9TiRIDaD3NzuTlkMlRuDROUs0m7z6LF9ISiUi_GVH-5IuD9GTbKQEyjaXk4DLq8OuICScwMKtan7GJ8TQkQ54aP8YcwstxTEdsIN8lyS7Ueb1iI-w8t9tVEhB3t8IhZOk5ZxtBdklOvrXbGhTIjYZ2Yw4FSLMzPJv9xLsuXvWdcw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADr7uWeG2quQ9FaBwmlEWV24C3T7l9c0fRuNN0261dov_3sA7C7iJwk4gWnl24_Dln1Kr7j_iNfm1jbCREwYwagJdaGNbIEngPHxzROqVviLPu3zHJI2HoNslEW1ToEyaEhBoBUliP5_eRc6rwgxzfiu1GhQwKpbtBS-okwXk193_MYWShE6hXg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAN6_8ucQ1y6azXWxn-qL6qfDIKlVlyzQmpkr1-NHdg7nBtNtpLSjVYVyLgMLEfkbxYtTmE5Og9nCv96y1ZYmXSezmVvB-9IkWqqDb0W8vP6q83iLlJQW-Liu4jMtRrsWlEhCvByl-0fDMB1dXmnzyIiYZGhTohz3IWysidL8wZxuAUOMICccTMg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAdkekvaV4XqvidobOZiUkHDVhiVMjAZzjkwfkd_SDHbtfwWsSGUAUsvmafMHlMUC500_QJrD9xXS_9V4D7XVJUpQarazUG5TATwY5sAcDD5kCVzL775ZsEyUOPMsik0FEhBLNWCjClIFKXE20og86-u2GhQ3QEUxWTxqxyc6uBFyJf1ejK02cQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnwEKfpXnqkSYNA7imbRTA-AtRdUt2VRzg-SHOOSZmeAmVcCv3l286NfuR7830eOTKc_FBRwPFgDRKdRDzi8guvzxsyaMpx9IcadF_nJN3Ej8r1qW7tBPl0mWXT1fRtYpEhArCRGpstsYtwprCOVqpCjJGhTUb1uWolHv_P8WSPUZNGnJti41lQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuiV-0W0xa2ll6dgbgqNxT1CG_ukacY6JH3E6EU6bsnCzZ8EOoylpKkrXX4L_mRNTEe-pZOy-RuCyVlpmRTaAMxh6V5tYIu4FQ8LT_p3u8UbQkjfDF8Mq0q98gBTuBKZLEhBjXQ45y0ALiiBQHUh1-RiEGhSQhu2MS2TZt6q1iR5NOWmCqpDUKA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA_q2KxxDW0EC7_QelrACsiTCR6ONunXoCRPNuONMtXYaKAcuVdF2XFTmwwKkb0j6ihszdTbxwaQb8bvCUly6M24L_pjaIrOajGqmLrlz1Gh3-zEDg5WSUKod3eoJXl92WEhB0PjE3gUdsM3Axt8Uofp_eGhT94D2Cy-VqFNTLTaNmCDWBVAFO_w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAoBbQs3WDye9VUcLBjMIToNQ-LYDTq9LHz3W8yh07xtiQ8VAQAy3yoqM_gNyq9NBjLo108rq0MKtIXJIF_20HajofNN1aKHWBl05j4t6q9gUNNLS7_JtRih-NNf5vVAE9EhBb2O5W4rcQGjATKaLio7jYGhQLXE55vcijgwSg3Tlk54qjyA-h8Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAkZ1tG-AWwaSiMsYVRaZoRHJ9nn0S1OiZ9i9mURqLoISdU0T4Tg_HWJVjTEPfhXt_89_xk9psl4c6M4KXYkq_qsK9CyOC4vUjjrcYbwfESbxv6xJ5B-rkjNDwuUVinalfEhAPcaGGNhyljHqj-NTH2QOHGhRGmsHTaYevJ1t08c_lNY_5TuySJg&maxwidth=400"
                    ],
                    "rating": 4.8,
                    "subcategory": "danceHalls",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50193429999999,-81.682772&markers=color:0x82CA75|41.50193429999999,-81.682772&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-05",
                            "name": "Slovenian Workmen's Home",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJlTHph-L-MIgRd0-T8ChT8dE",
                            "phone": "(216) 481-5378",
                            "address": "15335 Waterloo Rd, Cleveland, OH 44110, USA",
                            "location": {
                                "lat": 41.5704242,
                                "long": -81.57336719999999
                            },
                            "hours": {
                                "formattedHours": [
                                    "Monday: 3:00 PM – 1:00 AM",
                                    "Tuesday: 1:00 PM – 1:00 AM",
                                    "Wednesday: 1:00 PM – 1:00 AM",
                                    "Thursday: 1:00 PM – 1:00 AM",
                                    "Friday: 1:00 PM – 1:00 AM",
                                    "Saturday: 1:00 PM – 1:00 AM",
                                    "Sunday: 1:00 – 9:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2100"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1300"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1500"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1300"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1300"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1300"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1300"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1300"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Anita Savastano",
                                    "author_url": "https://www.google.com/maps/contrib/100579087455350565274/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-1kWwlDjckQc/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2gZJZV2GystKxxAKW9_yxlV5VoGw/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "Awesome fish fry on Friday evenings. We love it there",
                                    "time": 1520382755
                                },
                                {
                                    "author_name": "Michael Utt",
                                    "author_url": "https://www.google.com/maps/contrib/112056676503650397488/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-9eAin6u1h2M/AAAAAAAAAAI/AAAAAAAAP-w/ihaClg9D8kY/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "9 months ago",
                                    "text": "Very nice staff and the Friday fish frys are amazing.",
                                    "time": 1503178334
                                },
                                {
                                    "author_name": "PTAOM dotCOM",
                                    "author_url": "https://www.google.com/maps/contrib/113457484865742918057/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-OR0cZiP8Sbg/AAAAAAAAAAI/AAAAAAAA6sk/bIaVkss-sdo/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a year ago",
                                    "text": "Historic building with a theater stage and ballroom. \nAttractive space for the Coit Road Farmers Market harvest dinner annual benefit in an East side arts neighborhood in Cleveland. ",
                                    "time": 1476708026
                                },
                                {
                                    "author_name": "Michael Dragas",
                                    "author_url": "https://www.google.com/maps/contrib/105657134985144352819/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-UwNPJTTFYj8/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2MvkTxk_6tuKlsk9JFQbnAgRquVQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a year ago",
                                    "text": "Best fri. Fish fries like mom would make . ",
                                    "time": 1484517849
                                },
                                {
                                    "author_name": "Wendy Wargo",
                                    "author_url": "https://www.google.com/maps/contrib/117108051271264845947/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-y-wJTj6BUsQ/AAAAAAAAAAI/AAAAAAAAAB0/KJsemO4thag/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "5 months ago",
                                    "text": "Nice people",
                                    "time": 1514302774
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATs5e1Mpj_1BY76H7UmpOEeZnZyWbnNsyjnTerRCSGSAzAY7UBVfoQKoi5AAgUC01SSUHz2Xl2mqBOu5h2DCy4Ahwtj1htToLxHXma0_9lkJ9oKdTzWmpbaoku-W039vZEhDN-vJ9ybIODBuHTj_hoIJoGhT1lkyrU8pmDV5sITHzUBzTjNgemQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5evLIihlTixsoQCF3SVpvnLnhggJLK0dX5GY6hLKwKoXAjfLhvUWoVCDpoZRa8T28MsQs-lyAE17Md80Jjnis7T8g_1dvOuyMAUfz56ec7KOc6mdNRz_iJqn2Aj_UlD1EhAqJ4oZ1i5BwlDxGAUDO5FKGhQw8wxgncn-WFDved159M0hbCNmzw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiQYkVDdJtL3Q-fUuzx9yvBoxCRgAy_tKfcOLm4Wm0BqNEm_KKtn9Au_rE7wuuuuzL8u5iXk2m88VQG4o5D-QH2FKYWUwqyErSqii2sfrjmmMKzOTZ9J1qpGrv_IPuH0kEhCZxcjo3e0o5k9RdjNah9daGhR_klgNPDKEcRZDHChDt2QLk9JkMA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAvb4xSYYoleMv5orMirWHhTbpWkllBg1dPmQscJhSNva7Xr0c5uQw5Bg2Cl6FOBPD_lx35_WfQOKKhslfocj9iK7n4Mfs-GUVQ9yIakUTKAXv79QQ3H8x1Wg0GVvmdZm6EhB807X7x8UfeboF3RpXa_bnGhSHeE6-bcFr_4nBselDr6MfPiuLKA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARO0iY-5S8FV42AgpYAgj0AK9z6MMbSnmoe9wyoxhUi_tfWP7l8IZa80kW79OV79JmQYv5Hl2UVv-bwpsAy3oP-NEyvTAc2sVfSMG_i_A8ornPQqSmlEpZm39FvPdMYc1EhDiqp98-NBOeMB4hhFNKBrHGhSwPDyzWDJ_5LSgyMhWycwTMngVSg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA3lGC52DmjU1DYB5K4rWPuOIQDNFyiVFD0_9MZMrwnomVhOvI0Iti2yporP_BX-_1z6NBKTzKuDv0fFEl6-I1UaY4CpnNMoo5OePG86Ecqyign1n8JNaj5gk0Hh039mFnEhAy4rBBNzVuwHQZxABA4BzIGhR65MMNlEGgSqk2gaN2gX-2fDYjeQ&maxwidth=400"
                            ],
                            "rating": 4,
                            "category": "night",
                            "subcategory": "danceHalls",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5704242,-81.57336719999999&markers=color:0x82CA75|41.5704242,-81.57336719999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-05",
                            "name": "Mirage Party Center",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJvYk8APn9MIgRq_tKinaS2_c",
                            "phone": "(440) 785-4138",
                            "address": "4483 Mayfield Rd, Cleveland, OH 44121, USA",
                            "location": {
                                "lat": 41.5202355,
                                "long": -81.5186507
                            },
                            "website": "https://www.facebook.com/mirage.mirage.908",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 5:00 – 10:00 PM",
                                    "Tuesday: 5:00 – 10:00 PM",
                                    "Wednesday: 5:00 – 10:00 PM",
                                    "Thursday: 5:00 – 10:00 PM",
                                    "Friday: 7:00 PM – 12:00 AM",
                                    "Saturday: 7:00 PM – 12:00 AM",
                                    "Sunday: 4:00 – 11:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1900"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Gene Natale, Jr.",
                                    "author_url": "https://www.google.com/maps/contrib/109540262073152793023/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-YLYakU7thDA/AAAAAAAAAAI/AAAAAAAAAAA/O_mcQ29S87E/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Mirage is a wonderful, family-run venue. The owner is Russian and speaks very little English, but his (adult) daughter is happy to help as translator for anyone that does not speak Russian. The food is all great, and if you haven't been to a Russian-style wedding or Bar Mitzvah you are definitely in for a treat food-wise if you are attending or holding an event here. Prices are very reasonable and fair. Venue is small, but bigger than it looks from the outside. Plenty of parking and secure lot, South Euclid police frequently patrol the area and there is a fire department right down the street. Great venue, very safe, very friendly staff. Don't let the language barrier scare you off if you are thinking of holding an event here, the staff is very nice and accommodating.",
                                    "time": 1525456289
                                },
                                {
                                    "author_name": "Allan Idov",
                                    "author_url": "https://www.google.com/maps/contrib/105941870623728512841/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-JNEiYkp59UM/AAAAAAAAAAI/AAAAAAAAAD4/YHgYD5IY_aQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "Great food, great service, great prices. Would highly recommend going!",
                                    "time": 1528502613
                                },
                                {
                                    "author_name": "Lawanda Slone",
                                    "author_url": "https://www.google.com/maps/contrib/113310233213764694001/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-Lk0wc5bSAh0/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0LEsbk0VSjFiXXq3ZObM8_5_LhBw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 1,
                                    "relative_time_description": "10 months ago",
                                    "text": "I called to inquire about hosting my moms birthday here and was told that only Russians can host parties at this facility.",
                                    "time": 1501617049
                                },
                                {
                                    "author_name": "Lynnita Davis",
                                    "author_url": "https://www.google.com/maps/contrib/115355699297417910170/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-J8Xhh7HBUIY/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3XFE8fFGnTTJRITXOs_Z_yIigrlw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 1,
                                    "relative_time_description": "a year ago",
                                    "text": "I called the venue to ask questions about their party center. The guy answered the phone without a greeting. I had to ask if I had reached the party center. After he said, yes. He sat in silence. I then asked if he could answer my questions, he said no...click. Rude!!!",
                                    "time": 1474408048
                                },
                                {
                                    "author_name": "Xavier Norton",
                                    "author_url": "https://www.google.com/maps/contrib/112889697105844147812/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-wVPKkjzYAqM/AAAAAAAAAAI/AAAAAAAAME4/sZw6D1mRQyw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 1,
                                    "relative_time_description": "11 months ago",
                                    "text": "Very horrible to work with",
                                    "time": 1499372000
                                }
                            ],
                            "photos": [],
                            "rating": 2.6,
                            "category": "night",
                            "subcategory": "danceHalls",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5202355,-81.5186507&markers=color:0x82CA75|41.5202355,-81.5186507&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                }
            ],
            "date": "2018-09-05"
        },
        {
            "activities": [
                {
                    "date": "2018-09-06",
                    "name": "Six Shooter Coffee Roast Bar",
                    "category": "food",
                    "timeframe": "breakfast",
                    "startTime": "09:00 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "id": "zLLAm0whXDJlJAmmfXzyag",
                    "phone": "(216) 762-1180",
                    "address": "2111 Center St, Cleveland, OH 44113",
                    "location": {
                        "lat": 41.49448,
                        "long": -81.7056999
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.49448,-81.7056999&markers=color:0x82CA75|41.49448,-81.7056999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "website": null,
                    "hours": {
                        "formattedHours": [
                            "Sunday, 07:00 am - 04:00 pm",
                            "Monday, 07:00 am - 04:00 pm",
                            "Tuesday, 07:00 am - 04:00 pm",
                            "Wednesday, 07:00 am - 04:00 pm",
                            "Thursday, 07:00 am - 04:00 pm",
                            "Friday, 08:00 am - 03:00 pm",
                            "Saturday, 08:00 am - 03:00 pm"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1500"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1500"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "0800"
                                }
                            }
                        ]
                    },
                    "photos": [
                        "https://s3-media2.fl.yelpcdn.com/bphoto/9bkcnfKPSLx8GSvQrMa7FQ/o.jpg",
                        "https://s3-media2.fl.yelpcdn.com/bphoto/WvmOu0iYBZDCDijRltJb6w/o.jpg",
                        "https://s3-media3.fl.yelpcdn.com/bphoto/b--pAKzt5BSaD8pmS40mDQ/o.jpg"
                    ],
                    "price": 1.25,
                    "rating": 5,
                    "subcategory": "coffeeShops",
                    "backups": [
                        {
                            "date": "2018-09-06",
                            "name": "Equal Exchange Espresso Bar",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "OcXcAVjHoX0tTuzT5A8oww",
                            "phone": "(216) 302-3020",
                            "address": "900 Euclid Ave, Cleveland, OH 44115",
                            "location": {
                                "lat": 41.50006,
                                "long": -81.68612
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50006,-81.68612&markers=color:0x82CA75|41.50006,-81.68612&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Sunday, 06:30 am - 05:00 pm",
                                    "Monday, 06:30 am - 05:00 pm",
                                    "Tuesday, 06:30 am - 05:00 pm",
                                    "Wednesday, 06:30 am - 05:00 pm",
                                    "Thursday, 06:30 am - 05:00 pm",
                                    "Friday, 08:00 am - 05:00 pm",
                                    "Saturday, 08:00 am - 05:00 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0800"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media2.fl.yelpcdn.com/bphoto/YsMYRC7MgY_xi9ggWt3O2Q/o.jpg",
                                "https://s3-media1.fl.yelpcdn.com/bphoto/sx-j5d--Q2yCQ9hqLh3rhQ/o.jpg",
                                "https://s3-media2.fl.yelpcdn.com/bphoto/1-kT4lctjcpfZSK7ALENjQ/o.jpg"
                            ],
                            "rating": 5,
                            "category": "food",
                            "subcategory": "coffeeShops"
                        },
                        {
                            "date": "2018-09-06",
                            "name": "Phoenix Coffee Bar",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "63ieHAevJ5szVnClT8FzGQ",
                            "phone": "(216) 400-7901",
                            "address": "3000 Bridge Ave, Ste A, Cleveland, OH 44113",
                            "location": {
                                "lat": 41.4841834138661,
                                "long": -81.7088529064545
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4841834138661,-81.7088529064545&markers=color:0x82CA75|41.4841834138661,-81.7088529064545&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Sunday, 07:00 am - 07:00 pm",
                                    "Monday, 07:00 am - 07:00 pm",
                                    "Tuesday, 07:00 am - 07:00 pm",
                                    "Wednesday, 07:00 am - 07:00 pm",
                                    "Thursday, 07:00 am - 07:00 pm",
                                    "Friday, 08:00 am - 07:00 pm",
                                    "Saturday, 08:00 am - 06:00 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0800"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media4.fl.yelpcdn.com/bphoto/tjTVPwlkp4QVf4fy0DooZA/o.jpg",
                                "https://s3-media1.fl.yelpcdn.com/bphoto/Ck872istLzszXwV8CsAk5g/o.jpg",
                                "https://s3-media2.fl.yelpcdn.com/bphoto/BIv4Idj_HD903uNl5K2ZNw/o.jpg"
                            ],
                            "price": 1.25,
                            "rating": 4.5,
                            "category": "food",
                            "subcategory": "coffeeShops"
                        }
                    ]
                },
                {
                    "date": "2018-09-06",
                    "name": "The Western Reserve Fire Museum and Education Center",
                    "category": "day",
                    "startTime": "09:45 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJVQPal4P6MIgRclF8IXSNAnE",
                    "phone": "(216) 664-6312",
                    "address": "310 Carnegie Ave, Cleveland, OH 44115, USA",
                    "location": {
                        "lat": 41.4932,
                        "long": -81.68702700000001
                    },
                    "website": "http://wrfmc.com/Fire_Museum/Home.html",
                    "hours": {
                        "formattedHours": [
                            "Monday: Closed",
                            "Tuesday: Closed",
                            "Wednesday: 10:00 AM – 4:00 PM",
                            "Thursday: 10:00 AM – 4:00 PM",
                            "Friday: 10:00 AM – 4:00 PM",
                            "Saturday: 10:00 AM – 4:00 PM",
                            "Sunday: Closed"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1000"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Michael Snow",
                            "author_url": "https://www.google.com/maps/contrib/115915810204065827744/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-C5ZGSoVrqys/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1XXM--3huSBHeyq6msujVAUiQmJw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a week ago",
                            "text": "Excellent museum. We had a former firefighter giving us a tour. Did a fantastic job. I highly recommend this museum for any fire buff as well as history buffs.",
                            "time": 1528397360
                        },
                        {
                            "author_name": "SlightlyLegit X",
                            "author_url": "https://www.google.com/maps/contrib/114038297751208828391/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-SGLMBLudyJQ/AAAAAAAAAAI/AAAAAAAAAG4/p7Qkplj8b8M/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "10 months ago",
                            "text": "Very friendly workers and knowledgable. Definitely recommend if you are interested in the fire department histroy of Cleveland.",
                            "time": 1502388648
                        },
                        {
                            "author_name": "J Bell",
                            "author_url": "https://www.google.com/maps/contrib/114109349031855835565/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-PL-ebS-_uYo/AAAAAAAAAAI/AAAAAAAAAAA/mwCIJ0ABHzQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "4 months ago",
                            "text": "Great place to learn fire dept history",
                            "time": 1516512799
                        },
                        {
                            "author_name": "Scott Graham",
                            "author_url": "https://www.google.com/maps/contrib/111239894220903364125/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-_04m35-aYfA/AAAAAAAAAAI/AAAAAAAANNE/lx7pWYxt1xs/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a year ago",
                            "text": "Very cool place to check out for the family, or just to see yourself.",
                            "time": 1479852242
                        },
                        {
                            "author_name": "Zachary Frye",
                            "author_url": "https://www.google.com/maps/contrib/108758208853827091916/reviews",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-6amQBi_CO7o/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1SxTSpuk5UA-2sRyPyx0N8dm7XaQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 3,
                            "relative_time_description": "a year ago",
                            "text": "",
                            "time": 1478630246
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAb4vVPZxePfvAMCm3FC_FPj1o99oYCfuStPomrwWvK4vsRW-LBon2tjuWKeeklnCNjPmUqJoQbRZjhd_U_YF8LUWlCduAY7XSJ7Cx0Xer7R5tSWKqigiKW6YPmVl6wdNWEhCcenm_RbJmLYeTMxeKuMU0GhRX3JARzTDkut3wjgKtbh6rQpXZWw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAhNS1hJNiGjVQrOa2rd_d3q8L893hJs5-sO90v3_12VY5OQk4y4vWjtGeOnXHXpOO0DEr29t2om9eL8kUZfWQ5kLos_I1FYJKNS8Zvx5T51LXhCTh40kwRtZ3c9QpvS_gEhCH3-r1ObqGemQMJ5ghOyFdGhRHiqfJZ92PQPiQ2SpqpGGXXT_Nvw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJ3lSM7UCnqyomI5PwO4kOvLrnaAyS73NmSzo_EBvc53CZtNEUj5BtVmJOKodJmxyLlK4nBib5sBvudG4r22hdNjqIz2B8S8B3HpXGIaZER5CM2RY6Uo8Iqco48O_chaCEhDkLxNKlqx9sdoDvb1WrSofGhR8qATwldTxDSEJfkg7jp2jLaal2A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAI1PiHQ96pQBfWutsG6bMBYmDjQYVA8ennl9LmZ_YAvHBJD_HGHqKrbUl1TEvuqXaG5h4WoZuKqBDBcCHpS-3P6rD35_NttFN9oMxX5peR0yjApRw8_oEkweJab55snH2EhAc1272Ru15PQyhtdSzaKweGhT4hMm0K8QJTNOqklb9R_cdaNAYbA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAIGX4O7KLMKQJHFhF2R_POSQzWbpbyhfnzeMG1VCOtPYYIoWayP5w3oGys7A6TWn6QXSKxJowI89W97YOsVtOW_Qullju3o7MPsMCDYugd3n2Vl-RRTjX04QmqOunhiIEhAOWNGwFb5eFThfART-4s9mGhQiVQndXV-JFi5zy_zi5-zO7yEg1Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjOz-WXXJFVsiSRMNrnpTZv6R4gSiCLyyfa7j9NjzzVMiquEZESDMwfZMm-urHwgmHOCRGA7svr3Zj4w_JPpuNZLhDrqX4w0ETxtaShSysdXZUHouTBete5vr3lVQKlTrEhAgn6xDl1qQSdLVp0VNNRw_GhTCl5vlE4cz5ywaublBbXhMv-SSuQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-2dTH_MGyHcz0e92go1m06Nm2d40PkVaxuWLG1bNzd9vgw5o1NatIiN2HjblWDm6CyTMTe9x2LQWFyuMMfX02NY9-cNeYjHZyk8si79Rph756OweJ8R9ug3WSLVQPMuYEhBZhk2qXZaO5-A77uISkO7PGhTU_TnfMCXKZx53RM69Yo6O8FZ_tw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApCJYHT4wxhQym0SnF3tgBNQMpYAr3lkW2fk9Ekvcs6J2Dm-tJvG8EWony_ov4sjvUb8prTCfvXCFSpyBYKWwKrMe6qqLknFPaRPS5F7pXVaA4qr1sNpiVd5wiRvJjbxyEhAzrgf_sga6InflotOf5rFqGhTKjiWz3PB3kD6bu3g9c6NI19LeEg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAVlcEkAmp3SuplDV_tL5fvvG-T9Q63mDoM405RmdggXxCH7a3vh4LcFGyQRSSM3zaY-kg6Vlk01eEBhXeomaU4_aGaKiA1VFIUK0j9wMrohUElnHgLvbaKLStPAP1XI80EhCdJSAWgY1WN88mSM44md8iGhR4o59v0eFZ7wPcCH0euHAqZUPE-w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPU6aaB3NmIXHUvb5z4R-TteEB3U9feQH7BjaDt9HEYZXYiU1hsyD2ksphGbjxy3hFDlyaVfBwnwsW_Tp9VfskeZYUDZ-AGVhmotIhZ-J8j3Twz9KQcJ4v3ajIcAtxq7YEhA7hnQz5x7h1lQKD-HMFCYwGhSB2DsKOQhb798dNBztVS6EmC5DOA&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "subcategory": "museums",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4932,-81.68702700000001&markers=color:0x82CA75|41.4932,-81.68702700000001&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-06",
                            "name": "Steamship William G. Mather Museum",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJDRfY6oTwMIgRtMSVj_OwSKo",
                            "phone": "(216) 694-2000",
                            "address": "601 Erieside Ave, Cleveland, OH 44114, USA",
                            "location": {
                                "lat": 41.50925269999999,
                                "long": -81.698045
                            },
                            "website": "http://www.greatscience.com/explore/exhibits/william-g-mather-steamship",
                            "hours": {
                                "formattedHours": [
                                    "Monday: Closed",
                                    "Tuesday: 11:00 AM – 5:00 PM",
                                    "Wednesday: 11:00 AM – 5:00 PM",
                                    "Thursday: 11:00 AM – 5:00 PM",
                                    "Friday: 11:00 AM – 5:00 PM",
                                    "Saturday: 11:00 AM – 5:00 PM",
                                    "Sunday: 12:00 – 5:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1200"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1100"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Joshua Arthur",
                                    "author_url": "https://www.google.com/maps/contrib/107480568404171001716/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-g8Zkoesvx8s/AAAAAAAAAAI/AAAAAAAAM8M/hq0k8OK2w5M/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "One of the most amazing places I have gone I love this place!",
                                    "time": 1523205646
                                },
                                {
                                    "author_name": "Jim Doe",
                                    "author_url": "https://www.google.com/maps/contrib/114380551584787352244/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-iQ83tsk61W4/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq14-Ler8pRnwcYnf_IeI9rHt_580A/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "10 months ago",
                                    "text": "What an awesome part of the Great Lakes history! This is a great opportunity to see what it's like to be on a Great Lakes Freighter! This was a great experience and I would recommend it to anyone who finds Great Lake Freighters interesting! I look forward to going back soon!",
                                    "time": 1503099007
                                },
                                {
                                    "author_name": "PM",
                                    "author_url": "https://www.google.com/maps/contrib/116429156455135225944/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-MZTGExfGmPg/AAAAAAAAAAI/AAAAAAADkNM/nG0mYrN5fRk/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "Large steamship. Tours available.",
                                    "time": 1529014721
                                },
                                {
                                    "author_name": "Neal Smith",
                                    "author_url": "https://www.google.com/maps/contrib/101392694121654966887/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-kqGaN2Vk-fY/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3TjAcThr4lBkNqI97IAinDeN8cNg/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "11 months ago",
                                    "text": "Amazing piece of history on Lake Erie.Great tour to see this ship in and out.Good displays for kids inside with an explanation of the great lakes and what this ship did.Dont miss out,take this tour.",
                                    "time": 1499649254
                                },
                                {
                                    "author_name": "Jason Brooks",
                                    "author_url": "https://www.google.com/maps/contrib/101298958881109132865/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-Ny1GyvlR7-4/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq12GKqNMwJzZfMUM8Y11z6mGe_aCQ/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a year ago",
                                    "text": "Loved it always wanted to see what it looked like inside since I was a kid. Very in formative",
                                    "time": 1494716336
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGeEUUdmAZjmkwrcBucMeXk6EN9G_8wn13nkqvEmJBMkRrxVMYMY51SStDD1hUlj8ggen1z8gcifXLKRgCU5wQiJfVF-SGErul1CKdV3u0LL2gtinITQEeM3xASbZVBn_EhACNJDgfxG3fokNSiGlI8yYGhTjWk-2Jq95t3OHIVXWTHdRzRlB9A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7lkLeWH0Y0ZYHQY-ag8zbOVWMlWGItvxOxEk76tR9kFbzw98C-YneNcamcThJoOf5Y2EfimjSihJsoX4NP2tniJNqM8N3Bt773nI2S-SJaHTnOfjiEZ8SnsLfTR2PBabEhCibCcW5t7zHpGwyHYytWLwGhT8Ng73ZDsViJuBihOhALpc_L5etw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5uGEwFIe9V72Q5MyjbVJYQlx5E-L-ULIbptVOGXBvgoB5ttKaN9jV_9GUO9SBgXx_2wVu2_pHh1EjIM7G8u7zH4xbg5-Tp_Os1sDgOfR9el491_py_441GSTvIwQJBMdEhCeVZtjewwJNWKQXJ1mDP18GhRDANEjWzOx-0tL4D1WFqHFdCmETg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcp7YWTkrCsohUzFNcHZ_6neBMkd_rk4Rqe9KiSpcUCSjKcg_dCJ38rJMs_JW4gNiv3BdIqvufgI6BvFfqExLKuS4ODGiGA5yJJulw_1kiuC2vH3qFQGNR3hYALQGxkm7EhAtNehuwSFEweTKeSPx4daxGhQHz6mXO5OzRxZ0zp6Zu6jo4nnc-A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWWAfCp3UpUIpz0stk-FGWlrA0cmyuwE4QO4cQokX11EWXIeGeFdBlj3tBbrjxP0UU7ut4--GlQPPLmNyRPlocEd8lu0RZfSUwfa43ZO_okBB5w7l-NF2Q5ni3FTYSMLmEhBCt3i8yMHONrmmmN8AtJg1GhRUlV-SSTUry3Ym9okKaXe-sWyCew&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApnGo6n-dlFny5uOLOScHunCvn1QTeoeTkW9DkLvuGR3YpfK7Cd5RPwkFmDgm5IVBuNM_tGwvkkWYn71b2MuHub2QFj1u9mdNOIRXgqna1NcibXq6s4f2eoocArbavSVwEhA0pGRtiT6Mh-l4ZME95wasGhSDGsLIjzsVgHOkGL9EGNdj5YBn1A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAz8jePDUzTsKHFkZnxIDYCYHMBcxJAeRx4TcZHpAKjGzuFi-_i4IXVKwydem4A-apeT5qklwJAbBXst75xp5l6pWSY-IPTHhL3KK8Np-eikYaKR_oOn4oEXKEDp79wKZ0EhDM2--aM7WsN3jgMO2XwtDpGhSHNBKJIfhYn7n6F6dENIof4OzKQw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA8AP05cggQfmkqevZ2mLjKzoSv-p5tm0H13-iMi_NTJ2ssOCvtsUzjHb-qaYz4uuhn2aPHRnJvLHYXUkEyk66TWKWoeZzkUYqq-sw-w6-SKYab8IbX3No3t_X_xfvYVSAEhASZBIWGJ4FNi-hgYkTHCm-GhTzAUN_sOOjuqZITGy5dviCyHOm3g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQzr8bcmO-aoIS1-N41D2MN8wht2tyIp9QngULggXo7Ek8Sn0oYT6s7NwH9mkW_rDr9bI3FE1b-xdCXAl8bzk5gU_lP74_gSnX03sTlsdliariL9M0wobj93tyoeznzEUEhBlyCjegYfAmwMKdNcAvZbPGhSgyGvu1PAQvHltturydzk02qA1OA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtNohTK-ODaAsuNRZUUTBa1YmbFitPIKp3dGKoOSONCsyJAfBSdSVl5iV1DMUwQr8NOCsBMH41XqNCTG1Z0WgtDVWHeKBTrNDA1DvoP4FWasQ_nSUcmPGIxeJCped4-aOEhC30tBEtmu9rVknZpun16YNGhTTLcZChfjRuGic0V8ghMhfznxSrg&maxwidth=400"
                            ],
                            "rating": 4.7,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50925269999999,-81.698045&markers=color:0x82CA75|41.50925269999999,-81.698045&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-06",
                            "name": "Crawford Auto Aviation Museum",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJtQjHx4z7MIgRE2EaDg3BF3k",
                            "phone": "(216) 721-5722",
                            "address": "10825 East Blvd, Cleveland, OH 44106, USA",
                            "location": {
                                "lat": 41.5134255,
                                "long": -81.6109785
                            },
                            "website": "http://www.wrhs.org/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: Closed",
                                    "Tuesday: 10:00 AM – 5:00 PM",
                                    "Wednesday: 10:00 AM – 5:00 PM",
                                    "Thursday: 10:00 AM – 5:00 PM",
                                    "Friday: 10:00 AM – 5:00 PM",
                                    "Saturday: 10:00 AM – 5:00 PM",
                                    "Sunday: 12:00 – 5:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1200"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1000"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Greg Beckner",
                                    "author_url": "https://www.google.com/maps/contrib/100938341376223698671/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-NfQwde31Fmw/AAAAAAAAAAI/AAAAAAAAFQg/HVJHByN6jbU/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "in the last week",
                                    "text": "They have some interesting vehicles. Some of them are difficult to see inside so they have screens with photos. A lot of the photos are of the outside which can easily be seen. It would help to have photos of more detailed hard to see areas with captions about the view.",
                                    "time": 1528860910
                                },
                                {
                                    "author_name": "Mitch Koestler",
                                    "author_url": "https://www.google.com/maps/contrib/100299902124525163289/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-ugETCAKtLN0/AAAAAAAAAAI/AAAAAAAAAAc/A_A1h2b6xcU/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 weeks ago",
                                    "text": "Wonderful place for an outing with the kids. Great collection, not overwhelming, well organized, and helpful, courteous staff. Will definitely go back!",
                                    "time": 1527798765
                                },
                                {
                                    "author_name": "Tim Borkowski",
                                    "author_url": "https://www.google.com/maps/contrib/110377515935204784623/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-8flnvtPX5pI/AAAAAAAAAAI/AAAAAAAAvWM/yBBtVSMR72E/s128-c0x00000000-cc-rp-mo-ba6/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a month ago",
                                    "text": "Surprisingly nice, I have been there a few years before it was greatly disappointed after the renovations. It seems that the Crawford Museum has really tried to improve and succeeded in their efforts. Worth the price of admission.",
                                    "time": 1524583820
                                },
                                {
                                    "author_name": "Charis Walker",
                                    "author_url": "https://www.google.com/maps/contrib/117114473176713437009/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-aLT_4Lf9TGI/AAAAAAAAAAI/AAAAAAAAMpc/Xv60V9VLQp8/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a month ago",
                                    "text": "We took a group of children. There was so much to see and learn. They offered an educational workshop that was super interactive. They really had the students moving! I learned about a aviation in a new way.",
                                    "time": 1524958094
                                },
                                {
                                    "author_name": "emily doleh",
                                    "author_url": "https://www.google.com/maps/contrib/107457818083536483573/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-wXJtxxji7IM/AAAAAAAAAAI/AAAAAAAAI7U/KAZoF1J-hN8/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "The Crawford Auto Aviation Museum held a United We brunch for The Scene Magazine. I enjoyed the downstairs where there were classical cars. Otherwise this Museum was being held for a brunch by several different restaurants. They had a mimosa section right by the Bloody Marys. Only complaint I have about that as they only used one kind of Tito's and it did not taste well with My Bloody Mary. There was another drink they made for me that was made of Tito's and I can't remember what else I want to say it was a lemonade drink. I couldn't drink that either because the one Tito's they had just did not taste well with the drinks they were making maybe if they had the white label titos drinks would have tasted better because drinks were not all that everyone went downstairs where the cool cars were and where their beers were beers went by so fast because not everyone was feeling the brown label Tito's",
                                    "time": 1521102379
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAd58yZcjKjAspsmudGwx0wh3M7ls4TtZTzIsLADVKKXYBwj1nXfztA-RFEljgLeLT49ACuT3v9dU9F4DLD0XPNZ--on8Zaz0BzPWBOkMA0XiDwg1oa4ExUxktbuvyIvdiEhAP8iAKIIE6YRnhC8dca50NGhTW1bfexfj-Yl_ZmUZJHf3eCGpKXQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApKSTw84s4qHmctNXhVoT7k0uVhLa0Jy9GaB3tqCiCBnwnBBzESwIqjsK_17RJWEZvMnSWvedpCQcen44HT9Lhh-nUfPdzQI7QAwGJOk3yjsn0zTN5qr8j2dLRpmppbO6EhC39xP4ajSyHipYpCZ9HctwGhS1sNAEVtrEQM1q_Wx3Kd1WCajB_A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAN7CiV6I1p1orA8-_E01NBSQsoa9KHlIgah6-M_AQ8zjPXqlnP8UezpNBhm6xNYBMnBcZGLlXdO3In40p4IDfulOlF0LwZwX_hNtRK-A9BN2nq9Ir3tTdZl_k13KNkApbEhDSzca53_dqrKCSbKfHHdgBGhTl74PQCB-M_JHY6joqi8857uqE2g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAFoXWvfH7K63iSuQ7jYSypmtLEwfjmq7Joq7hIjiCNFJnf5_FnKE5zEaID04jwMsvjIx0J4LAbAfJbk9c34ewR0-gEidIbbkxNiX6tiH9pEhHPbnQhoxKa0bTIdm3fP0FEhDFxXt8GTaReUCRvx6l32LxGhSBTThsVE7-hCvu_g9ViNsl_X_HNg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5Z4BP_8T0MViTSl6ODDVcifizB9T7d-WnOkSeeE25e0UzJJdKtmAEtFl8Sfjms-UyN9RGSIKgYB2Ta3Iu5TVYsgv0SPEEAD6LsK3lllUgAVreI5iu7JmbPy7GHV01EDiEhCHWYLMWD_RF7SUHoAnI1gVGhQXKvGlHq7Ek2TJJHUrER5BgJfhOA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA1461EOAhm_Bw3Kll2j8oT9sS1Hy4j2rVsSVipDkcbX_2dg3nMHyArD-sNOFlH0NTV7Wn5GS2Wx2f8A7xMNElH0GkPgxEB8AdSuKW21sTMYOCS-bcfj-UjlITPhrLiYsvEhDbUcnM3DvkM_EW_Tz5wE6JGhR1FvmxFpW2FHWdL-75ALpU964JPg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcyUr3OuCFvEXsg5l6mK13woTtD6BqJIa5WMRXhJdglq09M4zHuiydqXtzYoB-wIHtteOnwqOV4GYC3BFWZ7p0b2C2peC9ylcMGr0LeAO6STQYRBxS14GULNHFuB2zrdbEhC3XXg65S6pclVAUauXndGpGhTudbbOWeNw8LuH4iW2AYZgwoOhSQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAamXCsfFIp71OdMTWOx-J4ha2BOQP9Ohb4WKZJ1iJt46T2b0OncF45ixGH5ymdJ14pOSgzgzz7r6kvbQwGEODnMlDHT-eZntUiV5vVeF5Dq7vgOueX7Iimirbr2dJAg-2EhDEyBhqDS9x-ci0TUHPBWizGhQVbTl4CMFB9RlE1IngzzTKotPTVw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA0uI1SuOj3YEmSjPqcKcy0DEWsE3HjJ7_KinifKAByRensfSoLUpBBeNP0ixu3tzx2NuAIzbKOtZPA-r8YczXjESFC8Wufzkni0wP7l7k9Rrn-TRPUk4l3Vw3wiNoad3NEhBeOf80wBVFQx8YL7IXzKz8GhTIIvC_vaPmeTOcuQBKgTS0bElkkA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAwsYd2uTDjjOCg7xQtxQAc0cjMpCoioNSyc7zjTjpdh62VO-pgXzebf7Pdm4nlUvSUoSlUgZ9J_pdcTyCBha38vvz4eYRkr61-IGk0b5FlEE-Omwf4R9IFFDqVeX8IIxpEhDb5hmOSPzkaZca-X1Sjk6aGhRR6gC6e4DZ6X66G2lkUHugAshQkw&maxwidth=400"
                            ],
                            "rating": 4.6,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5134255,-81.6109785&markers=color:0x82CA75|41.5134255,-81.6109785&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-06",
                    "name": "Wendy's",
                    "category": "food",
                    "timeframe": "lunch",
                    "startTime": "12:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJqRNKvGzwMIgRxJnazS1ycus",
                    "phone": "(216) 651-4666",
                    "address": "2937 Lorain Ave, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.48253810000001,
                        "long": -81.7066734
                    },
                    "website": "http://www.wendys.com/?utm_source=Yext&utm_medium=Google_My_Business&utm_campaign=Local_Search",
                    "hours": {
                        "formattedHours": [
                            "Monday: 10:00 AM – 12:00 AM",
                            "Tuesday: 10:00 AM – 12:00 AM",
                            "Wednesday: 10:00 AM – 12:00 AM",
                            "Thursday: 10:00 AM – 12:00 AM",
                            "Friday: 10:00 AM – 1:00 AM",
                            "Saturday: 10:00 AM – 1:00 AM",
                            "Sunday: 10:00 AM – 12:00 AM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 1,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "0100"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 0,
                                    "time": "0100"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1000"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Adrienne Merrill",
                            "author_url": "https://www.google.com/maps/contrib/103794773230546445322/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-buUH_dPYUoE/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3_Fypw-pmdtagz1E6iCeA_0TPucA/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "in the last week",
                            "text": "Fast. Good quality. Clean. Friendly. Accurate. That's pretty much all you can all from a fast food restaurant.",
                            "time": 1528764493
                        },
                        {
                            "author_name": "cecil price",
                            "author_url": "https://www.google.com/maps/contrib/109590055305563584783/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-spimGJuLiG8/AAAAAAAAAAI/AAAAAAAAAI0/EOMZmmyjGBk/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a month ago",
                            "text": "They have this new Chicken sandwich it's to die for. It has a spicy, and avocado sauce. The bun was delicious. It all came together perfect. And I learned they do not create all Wendy's the same. This Wendy's on Lorain Ave in Cleveland is the best.",
                            "time": 1525284053
                        },
                        {
                            "author_name": "Chuck Nardi Jr",
                            "author_url": "https://www.google.com/maps/contrib/108249691299969136113/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-uXVJy5Sdo0g/AAAAAAAAAAI/AAAAAAAACbU/f0veWnNKXZw/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 1,
                            "relative_time_description": "a week ago",
                            "text": "Very dirty would never use restroom OMG disgusting place . Screwed up my order and frosty was like a vanilla milkshake. Terrible counter people I went inside because waited in drive thru for 8 minutes never moved was worse inside . Wendy's has gone down hill",
                            "time": 1527874037
                        },
                        {
                            "author_name": "Michael Ubowski",
                            "author_url": "https://www.google.com/maps/contrib/109737868940373037603/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-lE-BwtzQlVU/AAAAAAAAAAI/AAAAAAAAEHY/sOAMvjVEkAE/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a week ago",
                            "text": "Quick service. Good fast food burgers.",
                            "time": 1528070033
                        },
                        {
                            "author_name": "Jon Takacs",
                            "author_url": "https://www.google.com/maps/contrib/109666626620367023436/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-IJg9hbSjnFc/AAAAAAAAAAI/AAAAAAAAIHQ/UNQB8Auk0Wg/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "a week ago",
                            "text": "A good local wendys. Nice service",
                            "time": 1527878727
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApzbyQxeSNXDIBKAbSxuiDINrxwd65_UiEntElf5NB-64Jl6BrAkhKMOt80bvgd8vo7s41r5dnGNhplxzEXis8ZZUy-Hx4X8olWXClOuaB6ToiiffN_XLlN07rL_y32o1EhDjdnTlI7eHFkJoiDp75VsAGhRE0FuEk7Lagu7crAN-Mb1igACN6Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAt0fIgmHr50KLZQZ25YIs390g-vZcYc8hVlqONOasQ9bLdNEl_zVIj3Ez5ULQzSPDJF1Qg3eLSCiTqdhQHi-UQoGYpBmkZtrIPUMkHF5KaFxceyF-pea2f4NCWswQ5AlEEhAMPnATKC5HZ2g9V-vBybQ1GhQqpXUVPE9-QTbnqqbb1h2rNCm8tQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAz8Ks2haz02nJKgR-RbhZGl0lKZiafwXoKdz3q3Q7Dt0oPhYo692soNkDwVaBOPfZbPSm0C2TIdHI1h5a7twFrjHn3gYeh5i0UPpaOEfwm3Aq_SxH4a4l6yOcgDDfaGH_EhB9a0_QZuibCxRSVvPFHrE_GhQ6NeAxzp2SaRLK3DVLs1Jeur1PPw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPTvM4l3kzuWS9ZaMfS7eQ6G8eBerx-8c1n6RbGJncyMugkbyh0o4k6HwQBm419-q3jpTvfFM4Kygr081DujVjYxHFlpFrR-d1T3X2r1AS45QirSdSUVmTivbYR1i0AtDEhDKZU86JDqNYoFFJFYq9oyZGhTCDPH8PhWF16e-EudPlBOJ-eQ6kQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAk6SXGNmmcZQiTBRgY72q7_mGrRO7vGBscJbxmYu8C6jz9NpROVc093_n3X1_-b0kYmMAZ-8VGdUA_GZUve2w0ExA6YfDFE745hsQRQxiuTiFFVd1DQLKaK2-9k9ohxn4EhAHyfrX7lZwgMzuka-pgd5UGhQWCUEHglb2vUrku8geQO8P5bZiLQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiUaSuQaf-y9xz_HYzfbQecJtyTShQZbKrF-4X90CoUBDXYPDA-lX_vCdNJ0dGEMOWwtXUxicv8WGzoPzX7XwWyzYscoFGyKRuP-ynT5gwIyh_U66on9-vy5ERAdrZuAcEhAjTdtWrh-bhWvyRBd9K1FNGhQZn9Rk46pbnCkHY0LH_pIE3rHi1g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAncqVK3NjQyCjHRtrWwQyqXRzuwFaqbE44Xd5NgT4WS4Y1o8twHrjyy156fc4Kw0i009nluO9QXfX2inG2CN2lZd2WeYUHb3HZqVAw19g7Io2SvEoG8V2kmGEvLYmtdE6EhCTq-V9IpTnbA3ql1o7xGn4GhQH-KfBt8od9BkbhG3sFFtv2XUV_w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAyKznp6m8rL88rjWPbvI0RGTIyVOFQDcqOIPp4dU1TdfZg5G2hXAxi70WQqGzjBVD82V4f7MYf_AVrNjX6Rm86kg7OTfg-OKoezdGKRUj6MG_9PM_PBpCzP580Ok0hMoSEhD7jllvF9IxBwnvMItPpz50GhR1ZzoMqDQTl1SlNWBNtOlRSDM2tQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAb63v8lWXc8UFdTgyklKoSW2jVV9NLV6phETvf8SFUpq0L5LRAnGBgaPSk1rAlavViSGiJE4SnBLR0xYXZUFY1gdRtcN4_92XYIsIa38nlcAH23LrtVNVYzCX_WzFapOxEhA4to8u08f5nWNlcG6ScaM3GhR2Sc8Bg0AZ9UkaHtc2fwojTbs57w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA8N2Pya160a_xWTu0ZN_4_Xw3d8K37itvqibnWC63PNG4db_wStDQuAx8DLs7UXOKfw9WB7bW0e-IValbmgKI6ShsjBixAhOREhYM2Is5ZOKDt4YfDEdpxNaSCy9TC1mgEhAY3c_UN85DA1jqTzaOfFhBGhS1H8oxgV4kFW5P79ufu5MsUp_5CA&maxwidth=400"
                    ],
                    "price": 1,
                    "rating": 3.8,
                    "subcategory": "fastFood",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.48253810000001,-81.7066734&markers=color:0x82CA75|41.48253810000001,-81.7066734&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-06",
                            "name": "Arby's",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJodhns2b6MIgRReFJZfpi9Lc",
                            "phone": "(216) 664-5676",
                            "address": "2203 Chester Ave, Cleveland, OH 44114, USA",
                            "location": {
                                "lat": 41.5040432,
                                "long": -81.6747793
                            },
                            "website": "https://locations.arbys.com/us/oh/cleveland/2203-chester-ave-.html",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 10:00 AM – 11:00 PM",
                                    "Tuesday: 10:00 AM – 11:00 PM",
                                    "Wednesday: 10:00 AM – 11:00 PM",
                                    "Thursday: 10:00 AM – 11:00 PM",
                                    "Friday: 10:00 AM – 12:00 AM",
                                    "Saturday: 10:00 AM – 12:00 AM",
                                    "Sunday: 11:00 AM – 9:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2100"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1000"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Tammy McKnight",
                                    "author_url": "https://www.google.com/maps/contrib/113866928417946296607/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-pMTvHbpUvN8/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3eXfm78WcVjedVn-gYk4wQod1j6A/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "in the last week",
                                    "text": "Haven't  eaten there vintage awhile , but the food was very good. Loved the bourbon bacon sandwich.",
                                    "time": 1528811546
                                },
                                {
                                    "author_name": "Frankie B.S",
                                    "author_url": "https://www.google.com/maps/contrib/104657043150300784178/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-w2IHKJu0D0U/AAAAAAAAAAI/AAAAAAAAArA/FX4YCmQeQHk/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Arby's is a great environment personally liked it a young lady that was black and short and Young she gave great Hospitality to me and my wife and got on the other employees for being slow need more people like her",
                                    "time": 1525925386
                                },
                                {
                                    "author_name": "Teresa Rogers",
                                    "author_url": "https://www.google.com/maps/contrib/103900717660563194615/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-zOA6D_oA3_k/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3X1yCozjLQLKmdU1VACCgsd_eQKQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "The food is always fresh. The survis is fast and the employees are very clean and polite",
                                    "time": 1528212353
                                },
                                {
                                    "author_name": "Frieda M. Johnson",
                                    "author_url": "https://www.google.com/maps/contrib/116958994966047437056/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-RWsOa_msvQ4/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3kk--BXQ93LnEd81QSwUg8HCkPTQ/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a month ago",
                                    "text": "The Arby's by CSU is very nice. The customer service is excellent. The only problem I have with Arby's is - their photos in t.v. and print ads don't match what you actually get in the store.  The actual quantity of meat and fixings is about half of what you see in a print or t.v. ad. That's a bummer😞. Other than that, their food is pretty good.",
                                    "time": 1526330428
                                },
                                {
                                    "author_name": "Caleb Vandezande",
                                    "author_url": "https://www.google.com/maps/contrib/116928400360261221331/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-AFI067hENDY/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1mJCNpx3lOHOQJpAteCuCSvP8Cnw/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 weeks ago",
                                    "text": "Love them order the meat mtn. Parking sucks but they are great staff and place",
                                    "time": 1526952896
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXpLoLsiDPm9_iWTT-5u6JZbPQKQsKbpyM3E02wtVT3nDhW9EdJdaU9nvdQXOr8Fit3nV2twVkAcUO-AgpCv6-03sXBxwm7_afSvkVCFaZJZHGAopgg8_yyeKU_DyvQXvEhCE7fobgDMf6ieanyS1BfyjGhRWJt6No-EtJXWbs6LTp9sDWjCj1Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAofB_epJP7eZghzU2a-Pv8VZ_Po4QEuH0eQNfnyv_vGn3m-YhfnefoyJcjphgEea8huRVziuXwSR_yWu084FZei7rE1BPNHSROkxWU6_I9xkAaaJgyhhah7AyYTHXe3wTEhAn1eOXk4fc_L2mfvlZe24HGhTCpsE6KOnsZNKS9S7nsocDLIuBEA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA2AU_SRQXYSGug0bdq214dZiHgLVVY8ikl9JzutZ7vNIXTo13ZpzkuMJo0TRzSIjrTlmCQUsRme_e9P5j8fPDb32bjlMbZDVQIssjI3pJFRBIvIosFN3KmCLmt_X8mkiPEhBibyas7OMYbXa7NNJfGqTFGhRR0FuTYvWq9rOuNDfdJs_xIQ-FNQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAsf2DZ6noTetHZKulWQWpe20Zy4POYZnPM-pte5XLb749iCAUgRVOuBiEO_nLV9em06U0RfPi3iup5V5pElSbesQ-jMkw-5xE_82yOFMGMZGMs7O4uLkEXl6BcGHAwufEhAvDc4nKJdaSqUW-s-3LicTGhTH1cH2XVM5sVtk4mFnTUMb69bs3w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJA4erJ0Alk8gOLS_-5xqzJgsKMiT-yTtDB1xsbrQmuQihHQ5lgjKbiKed4DtgA-ZTXm-8DO1Esdn2PkTjncmDwcL4qLWVVICYgm9oeKmPK2YY0_Wmj9KTElIKFdQVIYFEhDxlMxOwTOVzBnC0vKtxgdXGhQy6MXFTms0NEFcmxYvxgVveoIocA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjNUzCF5X53fN_PtUqmbYc3CsWUpnol-VPmrfaKTy7dZPYppL-NhHBbzIWXmMQfamumT69e9g1yHM0ppx9MJWAKv2suYTF_9QstlmQSva7FtGG6JQuPVZW4dfIqCNTzCkEhA5OeVzG6cy5_xFoHm0R2z-GhRMjn4AUdSISnVei5UvwW0UyLPNgw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAk8sigkPKfFzUI1QK-5bdM7emcgT7UbROQu-i6mcBPSd5gpcavBRN6R9fXiblAfQaeUb9V1Nn_wdf_OisYu9TY1vS-X00ChjlFoZKQUwLE6vAAnl8BiBOFtCM-sb2bYENEhBLqrQqEGqkzkeI_QUuH0b7GhQ0RosIw4blr-PGpyzS2rdmzj82vQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAudkUGHC0VivNkByKAc7CbMQSD4VIFxtQqykz7mR-KRVdKKMrWWKkEdhpK4WbBOkFlH_JbFiT07h8n38no1EwHHKwnqNFZdhOYbsbVxKe8gtAoSPPfeUlZFNL-QExs3e0EhBmeeHnXjcuH730OjDeummBGhQZ5TBcsYxDVyl5XG2VTXZ5hLC_cg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEkLmBRn6J6mughLupgJxwZatZCPk7rdl-EEFMvET8taZESDkCFs5--LnvMiCbCjejJPfDlQAH8-gOmccKRF6aShxJJ81ZN0VM39l1YwHjOdJjJRjkyJQBe2noIolPECMEhCo79OF6RQEhfmyCttCzzXOGhRzJ3DhbUnv6MCBB7gloDiAnaenqQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA51FR0lT5F1Tt-OarHI2o_8IU8NSILZbWmmkKdLcGxspEFDNd9H1efWnKlcOXDRl0XQXBtrYU81Sc02cQNGg1LVf25fuxTrwFzy-Sw8kTedNqDY4FtIulqtH1L1Y864GMEhAiuYQY5bRCHPAt3QAH1aIMGhS8O3dZMTRyRG1UynulrY_5jxx6ZQ&maxwidth=400"
                            ],
                            "price": 1,
                            "rating": 3.9,
                            "category": "food",
                            "subcategory": "fastFood",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5040432,-81.6747793&markers=color:0x82CA75|41.5040432,-81.6747793&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-06",
                            "name": "KFC",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJXf8Pll_6MIgRv59H5yK6MuU",
                            "phone": "(216) 621-1166",
                            "address": "2930 Carnegie Ave, Cleveland, OH 44115, USA",
                            "location": {
                                "lat": 41.4993397,
                                "long": -81.6671154
                            },
                            "website": "https://www.kfc.com/store-locator",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 10:30 AM – 11:00 PM",
                                    "Tuesday: 10:30 AM – 11:00 PM",
                                    "Wednesday: 10:30 AM – 11:00 PM",
                                    "Thursday: 10:30 AM – 11:00 PM",
                                    "Friday: 10:30 AM – 12:00 AM",
                                    "Saturday: 10:30 AM – 12:00 AM",
                                    "Sunday: 10:30 AM – 11:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1030"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1030"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1030"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1030"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1030"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1030"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1030"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Shaterra Adams-Billingsley",
                                    "author_url": "https://www.google.com/maps/contrib/103066368483476263491/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-AxRoXjvRNh8/AAAAAAAAAAI/AAAAAAAADNs/b0B06PAQfTw/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "2 months ago",
                                    "text": "1st time in a very long time that I bought food from here. It was pretty good the extra crispy chicken could have tasted a little better but it was cool. Paid $1 extra to have a bucket of all white meat only it cost extra to sub 1 side for another overall pretty good the gentlemen who got my items were sweet and even have extra biscuits at no additional charge. I'd order again. Only other down thing besides the overly extra crispy chicken (not in a good way crispy) was they were out of a lot of things which made ordering a little difficult and it took quite some time to get my order together.",
                                    "time": 1523451263
                                },
                                {
                                    "author_name": "Courtney Rice",
                                    "author_url": "https://www.google.com/maps/contrib/118206173637936654634/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-6tR256k89bg/AAAAAAAAAAI/AAAAAAAAVcM/mbQjBvIqR68/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 weeks ago",
                                    "text": "Fast fresh clean nice quick service I was surprised only bad thing the gentlemen in drive through wasn't friendly at all but the food was hot n delicious",
                                    "time": 1527438121
                                },
                                {
                                    "author_name": "James Ward",
                                    "author_url": "https://www.google.com/maps/contrib/118392220613496095358/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-y5tOnW9dISA/AAAAAAAAAAI/AAAAAAAAAJ4/zNx2XOMKcp0/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "This particular restaurant...KFC on 30th & Carnegie consistently gives good service. From start to finish...from the greeting to the completion of the order. Other fast food establishments should take note of how this restaurant does it. Thanks!",
                                    "time": 1520617020
                                },
                                {
                                    "author_name": "Amber",
                                    "author_url": "https://www.google.com/maps/contrib/113873622145992956647/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-3C95gn0o2Uw/AAAAAAAAAAI/AAAAAAAAAsQ/mz2cG9TxD3k/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "I love KFC...even if it isn't the healthiest choice.",
                                    "time": 1528814696
                                },
                                {
                                    "author_name": "Angela H",
                                    "author_url": "https://www.google.com/maps/contrib/102788671061938533731/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-EgiIxLIAMcU/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3JxqSH5iVs8xG2UdtkdTDIK8RYcg/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a week ago",
                                    "text": "Fast service and the food is hot. The bathroom was clean- just no toilet paper to be found !",
                                    "time": 1528305995
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANPKmbFAUrmjGkgS8w0Tdof8XIpQ8y30meuOgy7y7sThLaCAydDerYBt2oK7J1bkjTL-Q4gFz7ffZwH1B5yYZ-pWRKMUbUu-o7IvkszZJb4dcTpRztWtV7gQXYzFHjQhlEhANP6ts343lnHv6214q-tBxGhRoZJJp7TRnXN1MaAXQvyHZfb5tnQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUvpeKF3a9wK3ltNJgolfgU0OdKOeJNbKEXkgb7rEB-lXL5RaBZepeOAAtNoUWt6dz_LiNKqXrGTVQDWd6CNF3581aJEMUosN94ny9tyFb8sC88nsulyUyPwuDgTbnQCdEhBIPbHq22f7uzuGLlapiHbUGhSTnZCfWRjw3NfKa9qbwG7bZftRqA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAyXbGqzSS1Vq5Fn9H3ZW5SSP_BLyjgQDTKKSgZN7d3YJNYwgUMqr0fTyNdPLMlmqJ7Rn_njlWIh0i_e_zhRBtcEWmzqm8eutlPevkV7FgltzObm_Ai1Hey0J5_LZVkdCWEhAITWvH5fH-JZj2focfWlinGhQM-ihrfoqe4Vty0HIeEK04wmh_XQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAASoQbD5OXP64PwHGO60PTmZBrIxK48zt9TqpyKktbQjT6_C1BdZHxZbkYzzVLzzDi6moIRV7bvlwFckoKVlDV4ke9FT_x7y437Y-vItJHn9neN1p0GSolVNteqoSk17j4EhCocVtMeRnMRsVL8TKiZqkTGhRRMIe66_uAoglbgrQ5h-1nVitF9A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApW76pTKALsI_c6Yewfs6dX6KmvJ4LBpvAB_f6UGgGc06ZzOrQ45DrXT3mQNOXaT7X1uqk55NgSgFfyXI_txmkWqXHNmHOXpUs0JM5_wgu-PdhT42EhuiT3oiTbwEOd1UEhATr3h2ayvM1UlP2U2x_y9yGhRGbBujH_Ww33hS8N5Dtjlm9UeO-w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAFVMDNrzMXWvcjtZkAUDnQy1jWurnmU3q9zxIWKk0tufDKm_xwJMlrCHszpt4Ne-rMryiPu9ne90izVJmYlIbLMyI6OpxJFUGX3n4M-WZxIuBmsJ6KiKhVG4QhOcZnTBiEhC8rzuHB1pOskW0vCei5YUHGhSYE0Y4QkHvjcGiPVeGn5IthkeHlg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJ8bCgHCXvMPaIaX_aKkrU2yO8Yfbk9dwMCN6DPeKqsI11gvyIvhhZMdcvUgznnEJqy2V44h10MfRbBSQQ26UjwLTh-wxNeDFvp8WSi2vdrTmspRPb-VctAhftSsHgjCnEhBsg80gxGD4XgGsQlWpUAhbGhRWLgpOHaz-kSMqbW9iNs0DkIjhXw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA85MmeoB-YW7ub2oZfqO-svPWeo_Yvi0JIqK_Fzylo8Jp0NhLbL0Dia9_NPJ-AA-rQRjMlfaCY_AJ41klw6p6BNlZEmZZjdoSHMHl_UuiRtGbhV5gMzDncEvVl5N1FTh_EhBfTozLKV7ROl4yQFEwZ2fkGhT71R-T8s5Osj77J2GKM8p4hUgIpA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAkYt9XvopF_FmAJMf0AEemDS2hWTUeElhrdIEaqHQeaBMxvErPHYqK22zJM3TiSHc9p3Vj7ZagP6RcfK7JJPM98PHFt0JVQyBfvzAzMR1xMetN-kXq0ZLXBgHutP40fyXEhAcftqY862tjtwgIWIpIbuAGhT8e-W9yJUUHpvkwaUlEgCpsl_N7Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQ6y3J5izDpUKIEv0O0UICoRfjkKjl53gpgSg8OFhUqsk9uHMazN9JIrkzf0MIs5WPC4vAxixiq_kz5BzdCFhhfQ1U38b6wZ3QoAzbU0spq99mumxPoFHW0VfknR8C6OQEhDft21FhUvdgUJjTf9-uDwPGhTleinfjuXyeTg6rhqA0LsawcisLQ&maxwidth=400"
                            ],
                            "price": 1,
                            "rating": 3.6,
                            "category": "food",
                            "subcategory": "fastFood",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4993397,-81.6671154&markers=color:0x82CA75|41.4993397,-81.6671154&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-06",
                    "name": "NASA Glenn Visitor Center",
                    "category": "day",
                    "startTime": "12:30 pm",
                    "additionalTime": 15,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJLakF7cXsMIgR2JwCNgxklYk",
                    "phone": "(216) 694-2000",
                    "address": "601 Erieside Ave, Cleveland, OH 44114, USA",
                    "location": {
                        "lat": 41.5074192,
                        "long": -81.6967284
                    },
                    "website": "http://www.greatscience.com/exhibits/nasa-glenn-visitor-center.aspx",
                    "hours": {
                        "formattedHours": [
                            "Monday: Closed",
                            "Tuesday: 10:00 AM – 5:00 PM",
                            "Wednesday: 10:00 AM – 5:00 PM",
                            "Thursday: 10:00 AM – 5:00 PM",
                            "Friday: 10:00 AM – 5:00 PM",
                            "Saturday: 10:00 AM – 5:00 PM",
                            "Sunday: 12:00 – 5:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1200"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1000"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "wrestling maina",
                            "author_url": "https://www.google.com/maps/contrib/104368095845700852391/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-V-4Gh1OzvXw/AAAAAAAAAAI/AAAAAAAAHAc/HNwEotY_OIU/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a week ago",
                            "text": "Very nice experience and I love NASA",
                            "time": 1527997109
                        },
                        {
                            "author_name": "Raj Karibasappa",
                            "author_url": "https://www.google.com/maps/contrib/111650934006328781181/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-xFWTYgI9fqM/AAAAAAAAAAI/AAAAAAAABQs/aUgrXzVdWcU/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "9 months ago",
                            "text": "Best place to take kids above 6 years old, lot of information about space science. Available for paid parking but cost is bit higher side!",
                            "time": 1503883749
                        },
                        {
                            "author_name": "Maya Figueroa",
                            "author_url": "https://www.google.com/maps/contrib/117535806289224033503/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-jqYJQ4RRirM/AAAAAAAAAAI/AAAAAAAAADE/RXMrZv9-Izc/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a year ago",
                            "text": "I loved this place.It was awesome.So many cool things to do and awesome exhibits.Also they have awesome food and gift shop items.I will definitely be there again 😀😀😀😃😃\n",
                            "time": 1494103837
                        },
                        {
                            "author_name": "Surya Prakash N",
                            "author_url": "https://www.google.com/maps/contrib/101706105470662698508/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-cQtnEvM4q8w/AAAAAAAAAAI/AAAAAAAAEHA/KaKV73vUOpA/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "11 months ago",
                            "text": "Very good and informative for kids. Adults too can learn quite a bit. ",
                            "time": 1499228060
                        },
                        {
                            "author_name": "Melissa Baker",
                            "author_url": "https://www.google.com/maps/contrib/112724606016569469282/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-0DJ71an--MI/AAAAAAAAAAI/AAAAAAAAmrk/FEgrITxcsCQ/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "3 months ago",
                            "text": "Very nice experience!",
                            "time": 1520550131
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATJHhSHiaBowsw4T8Pvq1jrjegIN7v-oh4dYrT6BO1wWAFgAZ0t-_-Pbja4G6O8TIb_OjfsDm-e47c1HkMSqH7XTrN8DvtC30TM2_8efqylyvCM5LWdLhAAznDEXpq8SDEhCL0pvn8QqqxxHiRXzn0ID1GhQj8C4mLQFI-lnhrMmefQDTJJxC_A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlNPhgH4j2AsVLtZqJG6GEla0vhAyMq0PQmh740GznXaqlAgIdQp9ZrKkGs_kIa0w63SSxaQOaUdbkBasesDtohh5jnhVu4_2gNkCMp5tnxT9aat8D3ne0F44YOHpMbJREhDhZIfJKdTo295bhgC53TDzGhSH25EPRow8yp2AuQJFgyChXvg20w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7YlbT9fx_Dq0oqCMl0xlojvFs55nhygCYiMsort5L-Hebh6sCmHmG8XdE9vrnML9QTcOGjMxqbWYWKmPer6F8eqfblcEsKFlaU1Q7LMS2eFR_jbThMSYWXWo8qMiPnIrEhBtgcH8I1HjfbPelCj87vDiGhTmyiMsYV94jo_0dINgzO_oEipnvA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAACInlysvpVtzBCYrYy1_5_ME3KS5V33-8XCAsJx90t-nzz42rTLKVFHFpX_Xr40cvDDyBfTwkysv7EJU6apompDfquBP2E3rzkLVuMqgXkRkx7mmYSp2Ms_5v9-9XUQ9TEhDAXuikpSN2H8LzHqweVGSbGhQdU-rruMGUqviRJWjcDdSyT_-WXA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUZEj-sYIzodulMIwf3-lukrcHAPHLEgRGYhEJ9IfQYYMVJVx2D4Vlf3Mt_ivuSvVTTEtFUk7fh_pT149wt13BXz8SxW79sDntiN_2jCMvd3DvWjJ7vBdCrzemsO4Bd4iEhBR-Wv09xcuZg1AY444baOQGhR0TX0k_7bGZVb2ZEHnsXPpWrYmPw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnWnqhMdn_bW9zBuY4xuTYsqRheMscgKvpYD2VkMcujqWuknkQb7H_M2W0Usb0_r7L3Kaplppd-jaLOTwQTJluXUdx95u9ckylDTVtBJsbNpSGDIPiMkoQiixvY9gP8jwEhBmCiZ3x3keX3S53q8fJThWGhRmqksuKgRbKE71FUYE6aPhJLmpRw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAX_fOXBtTnrqMXz0LlYeZVDKvjQktLaU_MLc_pX1WABK1bbSDtNIWBxf-GrcAhbwTsxMFYqwg6bHGgDMH9C9wLVuHQwHdkM8dScfGX34qIvmKSWG6nGgeX6vX5ZOmPSPNEhBQcfz6Zm8y0jnnJCCqFRytGhRnj5slTF0NJic7Cs8VCYSzpFK5lA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAFNL_j-XGSwjsknbBcIMejduz4xN9J6_kL42bD61xRLifKJjxSdKJ92vHdtu4dEgO56Iw02HeNEARxcYF9Xf_wCEyMhZo1wy-AxEu_QHmCO3GCSNJM3vvHOoWNn0M2EI-EhBH8mmGYM5Nc6GuEJvB_zekGhS5ZfdA6Q_ZrBonV-HgWRMmk93nSw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAY4Hm9RM0tOoNwrXEn6Oe4AMZ9rdhkUuuKhzQvcK99GJW0mUVlOe68X0gBNzNXafS2WUIPACFHrE4OxKcbr7iIyrVI9t90nuMKVMbGM__KZJ1aBZ59uON6bVI7PEd18czEhAm5oqJP7SMC0A6JaP2WKEoGhQX9CoDFcMbVLAxAvle4gPXNEVCcA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAFoXAOdrGtsslWTTiOXknFLnPFnPWxDUYDzwyPWYsKpFy2jbyrnOIb-US-BXGM4QAjhZnWF7vt24qRInm8Rf8s1Z7IqCGfeBF1FasEvdLh5E2KKgTtFcGoe-MzWPpOnWiEhDX_KuCkLDXPfJaU2x46e_nGhRCTb6XVhEN3PYfi8Ggk1bKriLNug&maxwidth=400"
                    ],
                    "rating": 4.4,
                    "subcategory": "museums",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5074192,-81.6967284&markers=color:0x82CA75|41.5074192,-81.6967284&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-06",
                            "name": "Great Lakes Science Center",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJSaHMiYPwMIgRgphvNUOhoEQ",
                            "phone": "(216) 694-2000",
                            "address": "601 Erieside Ave, Cleveland, OH 44114, USA",
                            "location": {
                                "lat": 41.50744159999999,
                                "long": -81.6967337
                            },
                            "website": "http://www.greatscience.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 10:00 AM – 5:00 PM",
                                    "Tuesday: 10:00 AM – 5:00 PM",
                                    "Wednesday: 10:00 AM – 5:00 PM",
                                    "Thursday: 10:00 AM – 5:00 PM",
                                    "Friday: 10:00 AM – 5:00 PM",
                                    "Saturday: 10:00 AM – 5:00 PM",
                                    "Sunday: 12:00 – 5:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1200"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1000"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Kenneth Liao",
                                    "author_url": "https://www.google.com/maps/contrib/104758157084091266978/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-xBQ8OXUGFLs/AAAAAAAAAAI/AAAAAAAAAT8/O9lw2GggYAU/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Fun science center with lots of things to see and play with. It was easy to find parking and buy tickets. It took less than 3 hours for us to see everything and be ready to leave, which was fine because they were closing (at 5pm). Also we didn't have any kids with us, and that meant skipping most of the really kid-focused stuff (there seemed to be a lot of kid-focused stuff).\n\nAfterward we walked around the outside on the water toward the Rock & Roll Hall of Fame and encountered an astounding number of people playing Pokemon Go.",
                                    "time": 1525515405
                                },
                                {
                                    "author_name": "Ken Bielecki",
                                    "author_url": "https://www.google.com/maps/contrib/112200330497742731129/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-kGUljkJ0SaE/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1qlqNFFgAWo1xBBUaJdrIhcDTKPA/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "Our four year old had a wonderful first time experience at the Great Lakes science Center. We spent over three and a half hours enjoying all aspects of the Center. Lots of things to learn and try first hand. Staff were friendly along with everyone else who was there. Gift shop was very nice too! We hope to be back sometime soon from Trumbull County.",
                                    "time": 1523819420
                                },
                                {
                                    "author_name": "Logarathinam RR",
                                    "author_url": "https://www.google.com/maps/contrib/114562944372094678356/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-rrkdugYiN5s/AAAAAAAAAAI/AAAAAAAAI1Y/Kw4fuuCftuY/s128-c0x00000000-cc-rp-mo-ba6/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "Staffs >>> Very friendly\nTickets >>> You can buy online or at counter no difference\nRestrooms >>> Available in every floor\nParking >>> Paid parking, you can park at the parking building and pay the amount at the ticket if you like. If you park at second floor only problem is I didn't see escalator, so it's difficult to bring stroller.\nRefreshment >>> Food is available, Starbucks also available\nAttractions >>> For kids below 3 years they have children's play area in third floor, it's really worth and enjoyable for kids.\nNASA information center is very nice and lots of information so don't miss it.\nIn\nTrain ride is available in first floor it's really fun to ride.\nThis place is good to spend for 4 to 6 hours.",
                                    "time": 1523133316
                                },
                                {
                                    "author_name": "Valerie Lewis-Powell",
                                    "author_url": "https://www.google.com/maps/contrib/117549817956088586919/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-XKJSvaRSGWo/AAAAAAAAAAI/AAAAAAAACQo/nSMjPvMdNxc/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "I absolutely loved this place!! Visited my son and his family for 1 week,we went there twice(3 times??). All 4 grandkids(ages 3-6)love this place with all the interactive displays!! What a fantastic place~the kids(and adults)are very lucky to hold the membership yearly passes!!! Fantastic place to go let the kids have fun(while learning!!)!!",
                                    "time": 1525542043
                                },
                                {
                                    "author_name": "Landon Garrison",
                                    "author_url": "https://www.google.com/maps/contrib/115863057232610747823/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-BzuZTNWx9CE/AAAAAAAAAAI/AAAAAAAAABQ/44Ouj1iuX_s/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "Looked for things to do when the weather is 10F for our visiting 2-yr old grandson. He loved the kids room with special ball pit, building giant marble maze, gear wall. Also loved the temporary train attraction with riding train. Could have spent the whole time at both places. Main activity area also of interest but more for older kids. Had special events like snow making, ice cream making with nitrogen, other stuff. Cost us $15/each to get in. Under 2 free. Cheap for an all day adventure.",
                                    "time": 1518956426
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAA4LAs0Y57lVG6hxuSXcm43V1hXCphMli-03P-DGBmBACzg8mcXyGTbCpBD65_zLdcHv5oyUQe5YgC3i-_bFgU5QK4QV7nuZZ9qWrLy0J5EtkxKuFaW8LtxmUUe_YCZjVwEhCSZeXxXsmPXIqQlfXKDK3vGhTdm0wRFnbd7vz8KZ9LFBueksh6zQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAZO8CaUz7GBdHQEmpCkY675860IG7YfsT3xq1tSBJfS2ElerfDabnIh87VU_EjoMuJ3EcH9AiPqrw-2HhockCQGO76HHbOCs_dS_4McdR3Z1b5iMF6t3F7AJ-d-obKRILEhDNc5121_PFhr0skjRw4kc7GhQ_QsOTXz5092CjGyMnTPiaHGKW9w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAp-c6uk69gFpHVhW-Q2mnEGQMNTKiJsVJGEghbo-ErQqaPCO2X3LdI1XPKVV5XXJI5N-66CHMed4gb3utrTSSL7AW-7GG9A1bkkb3yXsGNauUshcMDDB2zCGRcvnOW9HXEhBOzBL8TseLan3xX_2jr9h0GhRx2WmWT4PH_JCLOLI5ZNZ-etqKsQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcvrCN6TZgIsR3qcibMx2qn9TNUSDMkAXto14vOgjT3BpDKjvrTaV24pGOZtaLSF9f1wi1C4SlIWRaP8mkSqSUBF9m5XXJvBeRsGALK40unhSuJZFpCVcD1P6rW1LXlrAEhA9eLgawSRzruvAgXdird_QGhRE3D8KIdk3_NxqIXsUwzMNaAOMZA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAFcMzUtRHe7iSQx6xE0NQdMaqVyQNBmBKzuf-LrxjU2OHyR7PiTAqLEjqEDfoJqU-HK45h3gR6H3WlR7YBWUc-XekETd4OETFsdRTiJRVhhYJfDQgqhXflDtIg1Gz6e6gEhDMd5M0KiiLDJsAmsKU4WJYGhR2yktA7gPDPWyqiIStZqgTeFbVVg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA1B9lsCd055IVVoCiQqMMSgkuo7animSOIxe0g3mIwjpsNcqjtdB62Y9LWBEaMjlffwvOar2YbuhpSdi_REtFefgRvuI0YeHk1p5rL8tPGiTKpVYP3jTntsgO752mwHPwEhDKLapV-mEr7gmuK-aZSZpFGhRlQKIlatNx_DTNNClci7q_S23vXw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9JRYe4CfW-D-2e6-faZFu3DFHHZlAYSTiH2kawiBBYF5oLYZoUJ1UMDYJvoVKu008z0vnwxexyEFqUlIOmFdgsMZ2zqeXslrwqxLg3rWcWcXcbiUpeegfJI5w0WmtpXgEhC-NhdROpIPBudoOcvyCKMvGhSmloee1eSISUB23r4Srui3ouZacA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-ccwXM5GzVq6TT9J1dVHSjbgSU_WbD_NyztTaeTdbVa-gnVm3LglB2qLj3FOVChu4MUtRRS9myufxNWyverjaTFMNGkFNERZV1XVaCZ1Sc19iu9YRPYjpx0hM_qvZqeREhDLyTeJEH6A6wQs18_MCEJRGhQhhnmEe1u5IhTRETDgW2Fh--iw8Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7XDCTot-scWLD08feoB3Y40yH1dDCti0clZhB4mK9mOFOW6yj9NDAiMuROAB0aPg9E-dM0yotJpkkYJ_4T9CycCciONbWIJB_9SU_0mBWPbQtakCrTHTIz71M_mZWIKLEhB9jnTe583L_RwqOpBYYGYLGhRWP-zqhu0bujqiwH8NWcPwtzHdJQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjYvjf6jJibsfmxgxXXvMOIVsDXSfAzisel5rbbQaknvmhwb1ouo7h6xZiOSEKVVi4bNG5uBqMGEJs_muLsgqggDQn50Tti4t7F5nc3aP1O2iqKmojOTsAve8JSIRsJWaEhA6mw_fI3Bn01mLQDIVJbEyGhTC9makZsnEKBoOm2vK_vtK9FbojQ&maxwidth=400"
                            ],
                            "rating": 4.5,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50744159999999,-81.6967337&markers=color:0x82CA75|41.50744159999999,-81.6967337&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-06",
                            "name": "Cleveland Museum of Natural History",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJITY1VYz7MIgRH4nF3v7V9Tg",
                            "phone": "(216) 231-4600",
                            "address": "1 Wade Oval Dr, Cleveland, OH 44106, USA",
                            "location": {
                                "lat": 41.511522,
                                "long": -81.61287999999999
                            },
                            "website": "https://www.cmnh.org/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 10:00 AM – 5:00 PM",
                                    "Tuesday: 10:00 AM – 5:00 PM",
                                    "Wednesday: 10:00 AM – 10:00 PM",
                                    "Thursday: 10:00 AM – 5:00 PM",
                                    "Friday: 10:00 AM – 5:00 PM",
                                    "Saturday: 10:00 AM – 5:00 PM",
                                    "Sunday: 12:00 – 5:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1200"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1000"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Emily Belleville",
                                    "author_url": "https://www.google.com/maps/contrib/106718492564567647350/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/--JrcHnP0ldo/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1_zMuBzWKhyR90y3ImbqmTo2IhJw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "My dad and I went here and explored the whole museum, including the planetarium..SO COOL!! There are so many exhibits and very neat things to look at! We discovered a whole other downstairs part of the museum that seemed like most people didn’t know existed. We were the only ones down there except for the occasional worker. That part is all about insects and birds and plants. I’m an ecology student so I found it extremely interesting. Overall it’s a great place for all ages!",
                                    "time": 1525568323
                                },
                                {
                                    "author_name": "nicole lindsey",
                                    "author_url": "https://www.google.com/maps/contrib/107009625682273099611/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-vxr0E8IUils/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1mvhNjREAdHoISsYQVPt7k_yZnPg/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "Wonderful place, my kids love it so much! Outdoor animal area is much bigger than expected and loved seeing the animals up and playing. The observatory and planetarium tour with the Cub scouts was amazing! Our guide was fantastic! I definitely enjoy our visits as much if not more than my kids! So happy to have a membership, there's always something new to experience :)",
                                    "time": 1522935481
                                },
                                {
                                    "author_name": "Bridget Coolick",
                                    "author_url": "https://www.google.com/maps/contrib/100117961922166228345/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-U5SINCJ2lnI/AAAAAAAAAAI/AAAAAAAAAF4/lGLzyfeQ1vM/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "Great museum for science and natural history! They had unique exhibits and a very knowledgeable staff. We went for the Think & Drink event in the evening and it was fantastic. They also have their own podcast so you learn about various topics wherever you go!",
                                    "time": 1528025387
                                },
                                {
                                    "author_name": "Jocelyn Darden",
                                    "author_url": "https://www.google.com/maps/contrib/101377921540473717823/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-OSU-kXDJmGg/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0JjlrT6EuBCB364Cbn3YAsL3TbKA/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "The planetarium shows (dark matter I think) was really great and worthy the $5! My daughters 7 and she loved it!(but my sister who is 12 had already been on a field trip and fell asleep)We went during the day and we had the place to ourselves. Each exhibit is well kept, informative, and many things are interactive. They have an explore room in the basement that should also not be missed.",
                                    "time": 1526067097
                                },
                                {
                                    "author_name": "mark mcgee",
                                    "author_url": "https://www.google.com/maps/contrib/100560697150610878957/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-g6ighKMKUO4/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2lHE5YfXzr5-8QjAtH7KtMbY4zig/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "We had a wonderful time we started with the dinosaurs and I got to touch an actual dinosaur bone which I thought was amazing also we spent a lot of time in the Hall of gems. We got to see some live animals! My wife and son checked out the dark matter show and they said that they loved it and it was very informative. We thought we'd only spend an hour and a half to two hours there we ended up spending 5 hours there because we had so much fun and there was so much to look at and do. I'd recommend this to anybody especially family is with younger children.",
                                    "time": 1522880355
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYh0JclOOkUXeWYNdXoAUC6cpiujqAwAK5BOKw0d0ewSno9ZZejC991JOQDqZE_xUPcNjaZ2hSOOW9TdE70WNyfK1IlD68SzfChECMH7INJWUSIweMqGi7sBJHFfdg52ZEhCIVYqyC_4tat_Fx6s6u_UOGhSepAqlgv1yn4v7iU1REL6M7OBunQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAkOmef4EIOo2FvpbzxIqzDs5geQsdLPu2RtM08PRwE_Oes69ni4OzU6x-JmcmVJZg6JFhAXg_QiegrOpBj7G0RTsU1EFkSONC4W_Bw9Ie0ALQyOCrdMfYxoLMgZ0Cn7dyEhB44jAs_SPTsLlF2blw42MyGhQljr6J3-Gv0yukUZMQ8snsWF6e_Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAH-LgVecAOhoO1qEep18khL0v9Y0XxSgvKDjmmb4000W9T1pzohub9CuRbADvOHeHRj3aUmUEUPKuZT36Hy3BD4X5T6-T2zGKbBXOcADDps06ndt2brciW0U9-bGF0g4QEhAp1WfmSRG60bNqSLfpvG8EGhT-NiGG2fc4ee8G-0tfhW37pvsD-w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAqk5kmv7qks1Ji4EyyDAa6DWbzx3Bn79nv6eL91YQLd29K-Nlyul27cQTmlVP2lDLBZxORwMJCWT7hALz3R21iKf6BdVMJtGpQ7YlHU7EENIVFJwl9tKL8qMNOcya3DpaEhAbIRLwHIr6I13z-iaqyBgAGhShBY7Sz01cMANky4PWNVcxe7VDUA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA2TnkuUOkXYfBMKS8jVdqyfzE_OsvkiomG88PZDiA3Eyj1QhEvI-_SSHUcJ1OGMnfAzrAPYWyZRSh6E68SAq8h8vX17pH78fNg0FnktPotNWW5b_fISYk85LJ_fBPkBdXEhBB0BxC20OV-2VwINl_J5KJGhQUotB6GFlfvVxbCraptp2ukASq8A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuun0bjNqWcp5MJlLDyChM5QtELIeP8TKWYvxFLpDFBCIFJA1H_vXV_6TdT5_tTqkOpraaUns9cV7xylq6YGUqEq7HXAuSINx3xJxE5h0XNX-zOv7o2G6xc0xVQHvVHHsEhDbmayL-jkhPrXC3yuVO8lqGhSOYOfqwkI0LhILBVGsl3YSly-Vkw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAALZqott3nAxV7AbdaDOVbZ-zkhXTu7e_5HEpivutCYCu5kChjOCUcXFxRm-miaYHJOachyELMrM37qmsA-tTufk0DATbH3L7N2DKMQ4qayxiKikJia3Tx-cr_5m_gKbH-EhD8NThLyskbhTz0Y4ZEhmodGhQ8a55aHYcMUCMeoyLHJRe7mac2DA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAs-Pxtrb0wR9MU3sPigmnfGgL5qiDIU-uCAiF4iwWc9ajBkQ2QrVXxuiYSm2Jx4p2IhdCHnU6wHzulbL0nYGUX2KFECh59-QMGi2wwYkFXqigyvNUg2QXlEfo9bdzqmgjEhAXCr4eM5Bvb3uFShGDC3IKGhQio6l5BJAVgvoznopZrQA34fUYyw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYQkcKwp-_VVQGygsEsA2vLVIvSe4yX77Kg7EiJ73kv1-YjgGFntS-voXMCp3yDgts2n_ck-uJQpDpDJBldidMjSQRXezem0VSyUIz_6OUvve_X5fGueQRtDmdN8Fxf5JEhCEkpDJ7hbqoLTNrbEBmfoKGhTDKirb3iRHDfqdT5JDBWEBv2alRA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5fiiHysdRu6MQC1R9bzBdPDczXK7_mZIkAkIkZ2SzZd3CzUWkra7dCwSfn8MQjgA_EPeiWycJrdb2qIiNPHsgDTV81wc5Vp54kacuMjC3EJhTL-LILlLDEN7CQLCHZPHEhDL-KCVR98Ev9c3-ZvnKuEOGhQ1_OiZENRfLXXfF218WF51WxKUfQ&maxwidth=400"
                            ],
                            "rating": 4.7,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.511522,-81.61287999999999&markers=color:0x82CA75|41.511522,-81.61287999999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-06",
                    "name": "Rainbow Shops",
                    "category": "day",
                    "startTime": "03:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJ30a_Hn_wMIgRJyVLbv2Risg",
                    "phone": "(216) 394-0054",
                    "address": "230 W Huron Rd, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.49713920000001,
                        "long": -81.6934704
                    },
                    "website": "http://www.rainbowshops.com/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 10:00 AM – 7:00 PM",
                            "Tuesday: 10:00 AM – 7:00 PM",
                            "Wednesday: 10:00 AM – 7:00 PM",
                            "Thursday: 10:00 AM – 7:00 PM",
                            "Friday: 10:00 AM – 7:00 PM",
                            "Saturday: 10:00 AM – 7:00 PM",
                            "Sunday: 12:00 – 5:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1200"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1000"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Rochelle Easley",
                            "author_url": "https://www.google.com/maps/contrib/109204856846141749559/reviews",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-2mb8M9e01e8/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1amnVm4GzGimEpJDIkxAm9UmMO3g/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "3 months ago",
                            "text": "",
                            "time": 1520356313
                        },
                        {
                            "author_name": "Lisa Nowlin",
                            "author_url": "https://www.google.com/maps/contrib/106538833043645055753/reviews",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-EW0PgOpz7ng/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1uW_dLs6H54__tKZ5_0RIji5qweQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a year ago",
                            "text": "",
                            "time": 1480797762
                        },
                        {
                            "author_name": "Antonia Alford",
                            "author_url": "https://www.google.com/maps/contrib/100285678094792562325/reviews",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-JY4azQJ8ip8/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2mFyhvbXIYgGDc_GgDrOxjCKKSwQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 years ago",
                            "text": "",
                            "time": 1465758366
                        }
                    ],
                    "photos": [],
                    "price": 1,
                    "rating": 5,
                    "subcategory": "shopping",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.49713920000001,-81.6934704&markers=color:0x82CA75|41.49713920000001,-81.6934704&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-06",
                            "name": "Cleveland Indians Team Shop",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJ7fYQtob6MIgRZTDaTHts6KA",
                            "phone": "(216) 420-4444",
                            "address": "2401 Ontario St, Cleveland, OH 44115, USA",
                            "location": {
                                "lat": 41.4952941,
                                "long": -81.6864265
                            },
                            "website": "http://cleveland.indians.mlb.com/cle/ballpark/team_shops.jsp",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 10:00 AM – 5:00 PM",
                                    "Tuesday: 10:00 AM – 5:00 PM",
                                    "Wednesday: 10:00 AM – 5:00 PM",
                                    "Thursday: 10:00 AM – 5:00 PM",
                                    "Friday: 10:00 AM – 5:00 PM",
                                    "Saturday: 10:00 AM – 5:00 PM",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1000"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "justin laclair",
                                    "author_url": "https://www.google.com/maps/contrib/114531771588277670405/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-b64BQc97Xyw/AAAAAAAAAAI/AAAAAAAAAbo/i5tadYuk2pc/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Greatest place in the world to pick up Cleveland gear. Girls was awesome and really friendly. Can't wait to visit again... Go Tribe!!!",
                                    "time": 1524433338
                                },
                                {
                                    "author_name": "David Yunker",
                                    "author_url": "https://www.google.com/maps/contrib/100912984839868255977/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-eRBfCYLgu0w/AAAAAAAAAAI/AAAAAAAAAMQ/yQ510jTqDTg/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "4 weeks ago",
                                    "text": "Nice selection in this team shop. The staff here is always helpful, just expect to pay the exorbitant MLB pricing and you are good to go.",
                                    "time": 1526545873
                                },
                                {
                                    "author_name": "Amy Parke",
                                    "author_url": "https://www.google.com/maps/contrib/118071565744948486108/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-5oztqoKRXFA/AAAAAAAAAAI/AAAAAAAADlQ/hPJWkTzJPbU/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 weeks ago",
                                    "text": "Love this place! Always busy, but efficient!",
                                    "time": 1527723899
                                },
                                {
                                    "author_name": "Josh Maximovich",
                                    "author_url": "https://www.google.com/maps/contrib/114285099791456517034/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-9ugjkYOmvtc/AAAAAAAAAAI/AAAAAAAAAA8/CTs8oJ6FiTw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "3 months ago",
                                    "text": "The selection in here is great. I would have rated this a 5 but you need a ticket to enter the stadium just to visit the Team shop.",
                                    "time": 1518893844
                                },
                                {
                                    "author_name": "Mac Mckeithen",
                                    "author_url": "https://www.google.com/maps/contrib/111052775719035254604/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-4TP5hpQ8Ll8/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq300JtUBZU6fJQuIn7Y_toas7BmHw/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 weeks ago",
                                    "text": "Best physical space for Tribe merch.",
                                    "time": 1527019530
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnABgrs1Wk9bRAwOTln7DlacMYL2lX0p38_6k0zOlwEK01Hi4PpyTmpMOg5vQ75PoE4QMcOAe1hntgWSBQHQ8aGwZOzr2xnyGUMAdGMWjYCmettXjJ5f4iEpseZa-yprlEhAlIUtguMXpZSfLZOrm-Dg4GhRoy7WHJv5zCqufPMvot854jpoepw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAgEdG3x1iE8M81d2gXUTtiK5HMgvW3jvlkb6D1ce_u9dgFWyjX4irusD95rGOeEldQ4quX-KfK6xQzYNxAq5rx4lmrkbxSN0oPSTH14RufiHC2QDBRuY6KXWI3PK60QfSEhAb_7SF3MBB0R6QtC4jo-QZGhRg6hhd69krJBTQ6ZUx_RArgs-EPQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmAEmPBJnSYXAOam2-F_naBf4k1nAnKj33JXjcN_Mvy6KyZ4i5VKzFaPxtieoonDc8JC7PrztPONmnoccfHuqNpm50YFbBThmRhcF4nqWqIZScBZuIFzkKNMQHe4NpB0jEhAHkfcu24bw7IC3nwsKjWinGhTt72hrKT7-zLDWw77DsIr4bPqcvg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPQM-FGK6p3163uK4hrLX_TOvFO64kgCLXz4O7x0e8tTLrxsGaax372y1chW7PDtDLCXobnHQZPSxfguER6wBBXSP2L57oRJ2gZ5TX_UNQBALR1VD8IRBo_wBSU4hjY9xEhDW66y6SeGJgubWXzL6SQbKGhRzZgCAcgtUFqxEE0btv6yAXbybxg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAASkJ6aiqNqPKxOW6CyHBSQGT_YwlrnsoGV6nx0j8rNm6_iYSbk2KGpEo_7kDrudpK53CKhmpQkUb3Iww4XuFH8PTgXSqdolo1lGokyB4bOXou9prz6KRA_JX_Njwf2q6JEhCzK-FFvF1zerDGKpHe15PoGhSLrAJjexgyG9j0gRw1JUPJux4faA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAioIIItc_2f7MCONl8tEA9L2Tcz15hGzAC2mw5h1956UNZXzuGI65l8CD5926KIWGjxnbuG6JEsVHFR1dddQx-tpygYQYsMD14FH3JTksTHSfABqCobum9Vk-6Gdm5S2kEhCrvGYyxHnp0IOChdZGvwD8GhTI8bG-XXPbIzx1mxJcyXmm8PUtgg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAO4EiZFZTmckwicsmXs35-W50eVXfMDNY6qqhOuRNkAllF-_QcdvjGKIbYyRNhKm0-b6leT65mX9R_0lyr75s0iDtApl5tTHV6YGFs4LeSjgpnfLWM91mRxnvR_zAD4gmEhBPYLPDidk6waDSgrXlWQQHGhSbAdeFubY3ZXR_sWhJkSTUAoNN1g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAeVpgxD1M99womaeA_BM5Zbk7RF_n2-BhuqqP1rWjRwwp74-Y_YgXysMvyXVhmV_6wR7GpF1Se2QNBftIjY0RRfw2fyu_4Hl7pvsYRFWCufc-K0LAYg12336Cm2viQIqqEhCdHb_FDTqnu3bFKqSkTDA3GhQZRPRIpHjelGdFKubrmJ9cgPvcKg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAB93ChcjhLxt9fIPem9O96aE5hHrDNO08qfz7w-tpSACrRODZF8Tf6JK0hq5rVBS603qV-y49XtiQCs_7AtRhGjfLkvrnDOPhAUDpNV7OqDR8JAkep9QL0njxOng7YpCQEhAME8dbAQfUCXNdCj_0oXhRGhQRy2ICqTuEY7hHCDhtMJWBPtpHAw&maxwidth=400"
                            ],
                            "rating": 4.4,
                            "category": "day",
                            "subcategory": "shopping",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4952941,-81.6864265&markers=color:0x82CA75|41.4952941,-81.6864265&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-06",
                            "name": "Park to Shop",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJaVMbC2j6MIgRNzOYpvcuHwo",
                            "address": "1580 E 30th St, Cleveland, OH 44114, USA",
                            "location": {
                                "lat": 41.50882250000001,
                                "long": -81.67049430000002
                            },
                            "website": "http://www.parktoshopmarket.com/zh/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 9:00 AM – 8:00 PM",
                                    "Tuesday: 9:00 AM – 8:00 PM",
                                    "Wednesday: 9:00 AM – 8:00 PM",
                                    "Thursday: 9:00 AM – 8:00 PM",
                                    "Friday: 9:00 AM – 8:00 PM",
                                    "Saturday: 9:00 AM – 8:00 PM",
                                    "Sunday: 9:00 AM – 8:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0900"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Christopher Uguccini",
                                    "author_url": "https://www.google.com/maps/contrib/108129198719725220995/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-BevZx7Lz9m0/AAAAAAAAAAI/AAAAAAAG2e4/XHWA6vJOcqQ/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "Excellent variety of produce, canned goods and other things that you just can't find anywhere around.  the prices are very reasonable and not what you would expect at such a specialty market.  if i lived closer to cleveland, i'd shop here every week for my produce and specialty goods.  love this place.",
                                    "time": 1528820462
                                },
                                {
                                    "author_name": "Gyanendra Joshi",
                                    "author_url": "https://www.google.com/maps/contrib/100861122567695032201/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-DFEba_-68CI/AAAAAAAAAAI/AAAAAAAAQuU/_2Tg6JlL75g/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a month ago",
                                    "text": "Good place for Asian Shopping. Many Korean, Chinese and Japanese stuffs available.",
                                    "time": 1524259680
                                },
                                {
                                    "author_name": "Farid Sharifi",
                                    "author_url": "https://www.google.com/maps/contrib/101184900352576476378/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-uSU7qHdJR40/AAAAAAAAAAI/AAAAAAAAAS8/VbKvE1KffZw/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "11 months ago",
                                    "text": "Lots of stuff for Asian cuisine. Fresh meat and fish. Exotic fruits and vegetables. Various teas. Good low prices. Many of the workers don't speak much English but they can still be helpful. Parking lot available. ",
                                    "time": 1500429760
                                },
                                {
                                    "author_name": "Michelle Barker",
                                    "author_url": "https://www.google.com/maps/contrib/114162626098081113774/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-jkNs7019v7k/AAAAAAAAAAI/AAAAAAAAEHI/LhZoUTSvP7M/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "6 months ago",
                                    "text": "The Asian supermarket is my favorite place to get items to make Asian inspired dishes. Everything you need to make an Asian meal yourself.",
                                    "time": 1513091669
                                },
                                {
                                    "author_name": "Kuan Siew",
                                    "author_url": "https://www.google.com/maps/contrib/108479354242151086236/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-rBLwL8qJmDo/AAAAAAAAAAI/AAAAAAAAH7Q/oT4AUqdPSNo/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "11 months ago",
                                    "text": "My usual shopping destination. Parking can be challenging at times. Very clean store. I buy both for home and for work place. They Supply, bulk kitchen needs. Great selections of fresh vegetables.  Fresh meat and seafood counter. Large selections of prepared food. Very crowded place. Check out Line are long during weekends. More user friendly for Westerners. ",
                                    "time": 1498834502
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5yU-8aUZGwFkqLyQxLlonG5fgu6E0OAOSq9LqEgeFe34fmQNWMd2GmE9113-x_oghxFh0J6NB9do0xbnaBDNlN3munDYGKNTcCqbHEYQhm3O8tMiclwRaOwjRd6YYoa2EhA_8BYvEkzyXhLL2VX9p8SXGhRrrCuhoPTqYYfwXyky5wZKz9u9Gw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAzUTe3TDEuXhuSswBgtqsguoOftiKOEM--nUZN2Tzfd_LwgFvxiSd2q7yjHnDHZ3Fq7EQS65vp_gpJi4Y8SZcvy7QTVQSagvyDZrZT1AattmlRLX3HUJNDkZDbBWMWXNhEhD7qj5gWeptytiLMQWRK39uGhQYSf8jU3XG22OnvfjhUKBqF_2p6g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcgG9u4vtq3QjONhwvCSoUcRzSOP9X8MLM9qz27sSWpbdS9bgQnGonnDfCRoZwEuFwv_TtwncljGvao9u-xrZey8Y5jZuc8IVm5pbW87F8kVKCF03Qs36X_O5kgTD_XY4EhCN8E6gbjIWcIL8jyDgd4bXGhQ8p5e9FAt6BpbRAcZ-9DEPgjE7xA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAyoFMo6ANxZVOFu-c8alPKTMHuB4Bm-MX0KQ_wxCTh_NcPUrsFAzDYv4oLhwllZvRLQidv4O43-FA-62OyY1i1AXpmuIaMnhDbQcRUA7QPhZjqLyF8is2wKW1fmO7vXY8EhCiRiWVhGR9lycdDziTkiD9GhQg6MgmZlH8JaITegxU9BmXDYmAzQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA01EeD-6EUkleG3p19r18T2YptCgwXiUfiXoU3nMapcyFqcdVH3G69nWR9CxGQyQ36u1ZPwuVqvLPHjFQo9yqQjkuaBpSAN9yEjgv842A-3F2ahX2Pm31YXn5x27haFH9EhBxCrkZXz7di2TCm03hUndWGhQanS7rMmYiKewElf8dilVPbx2S3g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAALaG-asv8GjBjFuFELd0DB3-hwEaXZeyZBKtjjXPpR80LPM0EUV1vycmTa0rRreVNUthAj5x9fjmZ218Rp4SxYL6knij4U-PtCR-bF0Kr4VozKDcygLsBvVtuRtS3zGuhEhD_H66xQBGMYf_GyO5AUqKzGhRwQ_Bze0FungbAvYUU8Gn4XkecMg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA_HjkG1lUwIMppJMelyNPhHNhXrRJhn5rPjQJvxJYTkW81bZ1N3gCTnRq-Z6jObGlC2dEuCBpH7lqs2vc-bi3DzjcX-t9aF_Hw-Gs4-Zp2-NKNCeqX49HJ2LshmqOdpr8EhDE21F6A0F-UCwVQnDBieidGhSNTvzkO059BKZJZLr1svteyfrSbg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAwRUE4kpTGNPdZmEuYC2xru7oRJ550JZNNzye0iLFQkkEP_iho8nVuMGYXO6APIVwXzTD2i5RiHqfjG82Wj6LA8SkHcGUVXUqf3rQvSZLYe9w1sgUEEOc6gsxRTZT2LL5EhAd4q87d6nNMvTswRGJdyAhGhT8M6jNaV1S5d6HgmlODVUnV9uA_w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAHxdhpZFFIANaOkYLBNYKTH8fdkE78ev89aE2jNYXO8o3LFKBhRyoDKdTulTnghGgfeH-DfgUpCdD_WuhLDmTsiNCx88Y1wQDp9YtCfi9mV_xTgQyGixGff479kodZ0yuEhDh5UxcHw6Q9UNclQMhXQ5GGhQ5jUf96-O2JxA2NJiH0n7vbLSGrQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAkv4HFDd-OvGM8UHGfwSacPhVbuvaNve26U10XtkmymXlgoNxFoNEobDOGo3FtfcOgoqIOoWosRwS8T0r95rLsWEGU5Q2F3o0LKOfKBBYh5FIjZQyp82CpoHuMiNYyrvaEhDQIYhLoIpa-p8o3pbKa7QZGhTrSwA3lgjrTnlekl2bcLiulRj5EQ&maxwidth=400"
                            ],
                            "rating": 4.3,
                            "category": "day",
                            "subcategory": "shopping",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50882250000001,-81.67049430000002&markers=color:0x82CA75|41.50882250000001,-81.67049430000002&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-06",
                    "name": "TURN Bar + Kitchen",
                    "category": "food",
                    "timeframe": "dinner",
                    "startTime": "05:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJ6fFs8X7wMIgRyY9BciNclXM",
                    "phone": "(216) 623-1300",
                    "address": "1515 W 3rd St, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.4972146,
                        "long": -81.69434880000001
                    },
                    "website": "http://www.ritzcarlton.com/en/hotels/cleveland/dining/turn-bar-and-kitchen",
                    "hours": {
                        "formattedHours": [
                            "Monday: 7:00 AM – 2:00 AM",
                            "Tuesday: 7:00 AM – 2:00 AM",
                            "Wednesday: 7:00 AM – 2:00 AM",
                            "Thursday: 7:00 AM – 2:00 AM",
                            "Friday: 7:00 AM – 2:00 AM",
                            "Saturday: 7:00 AM – 2:00 AM",
                            "Sunday: 7:00 AM – 12:00 AM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 1,
                                    "time": "0000"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "0200"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "0200"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "0200"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "0200"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "0200"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 0,
                                    "time": "0200"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "0700"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Leatha Mitchell",
                            "author_url": "https://www.google.com/maps/contrib/104551986926056349055/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-u0P_fPgnYrA/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1Ta26fyBxeQPZ25LO5m2kBW8A6Gw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "Haven't been in a while but when I did I loved it. It was late, the full menu wasn't available.  But ELC   asked Chef Williams if he would mind making me  the trout and he said of course he wouldn't mind. I loved the food and the service. I'm definitely going back every time I come to Cleveland...",
                            "time": 1521947141
                        },
                        {
                            "author_name": "Halle Baltes",
                            "author_url": "https://www.google.com/maps/contrib/105188089429690894660/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-8njZR26rHCI/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1vU0pJV02id1mNLf_7Rze-l7MhfA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "Fantastic food and great atmosphere! Must try the smoked cocktails while sitting by the fireplace! My compliments to the Chef!",
                            "time": 1521751994
                        },
                        {
                            "author_name": "Peter Schottenfels",
                            "author_url": "https://www.google.com/maps/contrib/111482466982204702462/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-B9SjRAQ1pI4/AAAAAAAAAAI/AAAAAAAAADE/ZgfpxtxiJsI/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "a month ago",
                            "text": "Great for a night cap. Lots of \"businessmen\" #combovers",
                            "time": 1525922002
                        },
                        {
                            "author_name": "Scott Long",
                            "author_url": "https://www.google.com/maps/contrib/115400368474925930149/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-V89-bTiNG1Y/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1K0tya3BL5cxWjZ9Png7tYAMt6wA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a year ago",
                            "text": "“Fabulous food!”\nMy husband surprised me for my birthday. Drove all the way from Pittsburgh to Cleveland just to go to this restaurant...and it was worth it. The service is impeccable and the food amazing. We were told their menu changes regularly to try and make use of fresh local and in-season ingredients. When we were there they were serving potato leek...",
                            "time": 1483516986
                        },
                        {
                            "author_name": "Juan Clark",
                            "author_url": "https://www.google.com/maps/contrib/106246782056474670130/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-kcT13nSi5EA/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2Q_c-S58FXYRGDTdUCpjeHalMjLQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a year ago",
                            "text": "That is right, I love the Trailer Park Taco (fried chicken strips) trashed (with Cheese). This place is busy, because it is good. Once you have been here, you will come back too. Also try the Queso and chips, a little on the hot side. Yum...",
                            "time": 1486103015
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAqL2GeuDVevJhfD6SpfDVz_aI1mYyQ12PJScQUMt7Q_cvlYZNTwWRCiwMM9FuxP8ATyyn9FHVjutzcXKMmodB9IbNnF3KDfR9gWjcbcWK-HlwroPlkEdNJy-j5u_QdDurEhDBVy2PSN8UMe1-NTK5_4STGhQXZog-_zskzxN7ABdYmzJM7BijuQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA1fLimZdxZVAkjDFZh8UuefPekKnFel2w_pWUIOGNA0UYMHneEyhs0tbrOcv1fHkihoUIO-1o2ixgIvnuP5B8g0sSLgFk2d4jpH1OTzxFvhqZmoCBuHbqzRY-1QEFP0MsEhDdztx8hqPrlJsFu3plDRJQGhTJ_BaxFGkaj37L25diVDpxJPaiYA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAwt8R3mlQD-pkHDZnEWHMqN-NCe8yJlrjYnHXLvwRpwT8YserT7CDeMafcO6F1IzUzlt7QpOZ8APawE7aWVz9ujO98lwPVI_4T112y6o8wcbox524lzpybSpUV4KqXnYjEhAP4ECah00l2tHuOt3jsKJeGhTXhk4NOqAOxdGMlxUD8YjRlRVIOA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAeETTK0W0EZvvD_1_Wt18O1y_1Hemue_3W3vGqfwtiDJG-62vt7SRaXxeXDw6Z_qkTtFVRMKpYJ_Cpy9UtOK-9Gcn8dIWTOw0LXjuBky-6FfDujVKFMCpFJu_-avwhrR5EhCcllKgT53-qrf9JJrrnz3PGhQWikRf1sLBAHj0c69JrlteeJ5NYA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAdfKjrsM_0K65d3iLQj_67fJicluf1sXWlVaigHb8VRlRjWaqZUQU439yKPYZLttP2_I9AaKppl7zbmOSSCTQV11irFRe0K0LD8qlk7Su6cl3a4Z46zl4nqUeaCkTp5tQEhAqWNq_qSW0tJcZn8_h-tTtGhTTfVB-lfvPX90WZfgM-k7Cw-4E0w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAz_arbVFHkemtrUMXt_NpKGZ7XPHVTrHE1WLRwrrk7SOnLIU10PHHVA-rftVrRatnCNBppsc6skPK7AA9xPEFt0UBmsfYnrCiyhwRTIHk5m1UdBmgrDt46jzyy4BUgCRzEhCupMhBTfffyZum80jCHBgcGhT2XVeuHDwSEaFG3BFVm_bE7jEXjQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA6xPHRC4jW50yhPSdfDOcI-3DoHl3G2tZPVMru7GlAmc4V-k_AXGDJNcJSXC3P0Jf-srbfmYtlp_IYSMAaa8sRc1WCb392GPsU-wpsnEa7ObFpNW9H6cbRt2I0F8_mCHnEhDLs5C7bw7xQbLzj_IduLWiGhT7rj0mdgnm6sZofzWojQMKjn0s-A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAG8SLAKgNvYxq2VnKiagkYaKBe--UYfoHhP90Sj2YPONvyMCf1QXPT5ThUy_9lD9yImPc8yWUSvaIVaH6z3yeQt0BtVqYxItfO4kosm7IsDFahIYE7xN6C8M2FvBkdfhCEhC0k2pESH2I87AGQ_3Jmo2SGhSlDhfLnSesod6_0FDwOkuo-S-Mug&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9YmdB7RFywB30ItNv18pnOk7IX5zK4ialIIYgozlQp573BCz50WKJf7FtUh29bAe2elvwuppzkA16DfN1xuDUWsgVnntCUA0SgzinU_KiqeDt4RiPKBswM1nNytYvBu0EhCIaICtn9ZvetNYWlrrgmWnGhTcubl7YEVRN730d2dvvgL-TbIruw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARl-OI6KH1dYI1gtaUhkTJ2Jlnhxkmimq3svRfj9o40D9tj-h-zjvfYsf4Sjf57PGuMYR0s2mnqlIUDznGspTCeIUOWrn_UfmdD3g5C7UMmhsu1Cnx-GhWxxOqHjL2tg7EhAQPBBna0ECKVJTC0dLobTuGhTjthFojRpNsun1mI02sOcmYQ_M0w&maxwidth=400"
                    ],
                    "price": 3,
                    "rating": 4.6,
                    "subcategory": "upscale",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4972146,-81.69434880000001&markers=color:0x82CA75|41.4972146,-81.69434880000001&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-06",
                            "name": "Parallax",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJO2W2rZ_6MIgRwImdm6lF-yg",
                            "phone": "(216) 583-9999",
                            "address": "2179 W 11th St, Cleveland, OH 44113, USA",
                            "location": {
                                "lat": 41.4823982,
                                "long": -81.6890059
                            },
                            "website": "http://parallaxtremont.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 11:30 AM – 10:00 PM",
                                    "Tuesday: 11:30 AM – 10:00 PM",
                                    "Wednesday: 11:30 AM – 10:00 PM",
                                    "Thursday: 11:30 AM – 10:00 PM",
                                    "Friday: 11:30 AM – 12:00 AM",
                                    "Saturday: 5:00 PM – 12:00 AM",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "0000"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1700"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Alicia Salloum",
                                    "author_url": "https://www.google.com/maps/contrib/107143694109239993572/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/--LDWXBVA85c/AAAAAAAAAAI/AAAAAAABBQk/rGnYDhOS-Ac/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "a month ago",
                                    "text": "Since I have been long acquainted with Cleveland's \"food scene\", there aren't many restaurants that I haven't had the chance to review. I was extremely excited to critique Parallax but in all honesty, left disappointed. Ordered one of the weekly specials which consisted of grouper cheek, tapenade, green beans infused with fruit essences. The fish was largely undercooked and I caught myself reflexively gagging on my food due to the taste accompanied. Utterly horrible! Seafood freshness and excellence of preparation should be stressed by ALL restaurants. I haven't encountered such an issue during the entire history of my dining experiences. I was honestly shocked for such an issue to have occurred here, especially given that  Parallax is located in an otherwise trendy and foodie friendly district in Cleveland. Aside from the poor food preparation displayed during the night I dined here, the interior is modern and comfortable, the drink list featured a generous selection & decent service accompanied these qualities. However, as previously stated, for what was paid; my meal never should have arrived undercooked.",
                                    "time": 1525199840
                                },
                                {
                                    "author_name": "William Eadie",
                                    "author_url": "https://www.google.com/maps/contrib/108304874238499843147/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-9byF44H6CU8/AAAAAAAAAAI/AAAAAAAAARg/VvxrFfR9ioM/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "Yum yum yum. Great sushi and menu and cocktails. Friendly wait staff. Good place for a (slightly expensive but fancy) lunch meeting, cocktail evening, or date night. Seafood always well prepared.",
                                    "time": 1527830439
                                },
                                {
                                    "author_name": "Zuzanna's World",
                                    "author_url": "https://www.google.com/maps/contrib/116951043753450036157/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-c7jqjXY2W0I/AAAAAAAAAAI/AAAAAAAABGs/XxWkpjPHWYE/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "Attending during the evening times are very relaxing and almost improves the stay. Their sushi is delicious and the employees are kind. I recommend thus this restaurant.",
                                    "time": 1528565059
                                },
                                {
                                    "author_name": "Patti La Belle",
                                    "author_url": "https://www.google.com/maps/contrib/103809755298001133123/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-N3_SXPsfhUM/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq38qyyKTi2POTm3Xbm_HNMhVEwjsQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "Just went here for the first time during lunch hour & loved the atmosphere, food, service, and the prices are very affordable. Squid salad beats any other place I've had before! Hot sake on a chilly afternoon hit the spot! The bread was a little on the hard side but I THINK it's supposed to be like that? Overall, good experience.",
                                    "time": 1521097427
                                },
                                {
                                    "author_name": "Thomas Evans",
                                    "author_url": "https://www.google.com/maps/contrib/110573765387151114289/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-dJA2_KQid-8/AAAAAAAAAAI/AAAAAAAAAGg/Fajilil6Jeg/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Very good food. Miso cod was outstanding. Server's recommendation was great, 4 Graces Pinot. Wednesday is half price wine on most of the wine which made things that much better. Very good service.",
                                    "time": 1524535100
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAN_oBx47OrqHy0Rfy0Z6G5qVc51CRzAx0F6VyU_qk1fhl5gNzH0aDDasxD0Bts4Bhzm35dOXlGrXxZBylPncXgMNFlFW1qSBVzNSiks3yLAxwa1fD4eQqvPbVwCrRTI2OEhBwhLl4sgtRtU7fB2_57_V2GhQw5pB9qdJxLfLLA3jkW_LNU_i9Ig&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuYxyq6Z-zBXY2mDM_COS_ASvY5FR9WYRda8zKoAdkRI_txl1bZfEQsVPeYZNsmchbg68evgkC75OHaFe8cCWw6PDAVsOoxxAVXkz09gpP0FdjtKx_cKsaUtcdq2r9CAxEhDpRYo8kHtLbrGFxitgCJfGGhSXpnPJWFqmF4sYaiFtjAKWpSHHnQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAaJL9sT9anga3Mp8xmjNgco8LzIgvqqjrm6M3zfHyHCKlaDeZ52SDX2HIyy1aOapiLDYzqS7lPibOPKacXgs5xtJEEYXrqaQ2gH7qcpd_urj3D2fXrrbwzaVqBqjGf7L8EhB0TIGyWTdQeqFakYcpabS9GhTNXnLpAVfXC3JuTaWTAqt1uSTYKw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAKILDgFZ5c0GISzQXBCcz8RGX0YYSOgHRM6Tvmc4QNvZmum-Xk2CvUdAIJOGTxeVTc-IQa_gd0ht52dhvnP-dYTUxZ0EwrNCzls7RilTlsLdwR6H4Qg7tWzdYBq_HFpfwEhDwcyEHcqsyzLprL84nOYG9GhTsaYvexPD1Df4zFNeQSDQVzgxQBg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA_Gd0Qfu25ROnIcslMJH14hElcQW4_sgvwAO9548jf_Gz2-hh7uSmfVaiQz1aDBF2FtGSZKplthh03WoZIW4j2AD3QeHL693cPXiLzYWMjz8jT6v0oei5_xAtsy_IzVviEhBBh5xhMWJNJBGxp6BPrzg_GhRy2jircERpziT1XrLo_n2iNZCmYA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXSK-A--9zrZAWGIH3LRelreWHKgqOsoqHBGV-MiALWOsDQqy33HCnCIg36ZnkU9xrOkbcGaaOwLAVik6qHOIDAUNBOLgG2l6q8F7wLQnxf0WXOVlFt5o48pNIJvN1oSoEhDwrdBbyZKNlGqjiILGkCC6GhTToMp7cryoA9w_Oh4insOkUMyLHg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGAqE9DEPRedAcfWgsi7Yn3C0g7MGILRy3ythjNNjh09u4iPD-1G_Wj4spMS3FqT_obeHEsrLCT6uGNdoCBc4j-ZThj_b6JMi3U_hd2jPkFBPVFWMrYOjQITB9NaEexnrEhAWFfKrmvm_B28TmmvNWev-GhRHgSPFsghWVWSw_wnpv9o9ogAk8w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAABUdwHOEPYuIISsA489dMxnLQp8IgTs00sSouOoFxi32Qp9QgJ4STk-S7_gWyZjGQ-kT-p1cfTdjDQ7v8h_oUfGpLQU-iqCIPa3saSIQ6EZ9h1fZoBpqSyfiFZv-duAF0EhCSxmu51nXM82gQKeebjxJYGhRjkm5ZEghhQQ-yB30x0IOcCKwcGg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANRcjULTPTw5drwsOUCACrXf9BE9c6pdzz8krnfGru5KhERBE-9b7wHokEIMXPTEUQ_4hF5fkjYJVxyFPyvOJyS6TuoklKeidWxF_unbqZJKgvvJLiuhA64Z4Sh71MvyjEhAO90MtGjGUbcdUsmqSEnIKGhSqyyy365h1SUGDdtpAWhWtPNOHtg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiyGGorJQnOpmU-CR4UT1AL7R8NBQnTRNCXaDdr_e2LZl7w4YH1YfxaGiB-Sq62S-R2vLXezvXF4BJHq9R0WBz0Fh8t0rsg78w_qcT27Ef6Gr5iO6TD_BeKUvQ5YmWKhOEhBc4YZk09zW_AFu20Tk3_wQGhS_pHk44fP1hW3uQP8naFhHMXf9Pw&maxwidth=400"
                            ],
                            "price": 3,
                            "rating": 4.5,
                            "category": "food",
                            "subcategory": "upscale",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4823982,-81.6890059&markers=color:0x82CA75|41.4823982,-81.6890059&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-06",
                            "name": "Blue Point Grille",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJwejCoX3wMIgR0FzkNYMYRIU",
                            "phone": "(216) 875-7827",
                            "address": "700 West Saint Clair Avenue, Cleveland, OH 44113, USA",
                            "location": {
                                "lat": 41.49967530000001,
                                "long": -81.69895679999999
                            },
                            "website": "http://www.bluepointgrille.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 11:30 AM – 10:00 PM",
                                    "Tuesday: 11:30 AM – 10:00 PM",
                                    "Wednesday: 11:30 AM – 10:00 PM",
                                    "Thursday: 11:30 AM – 10:00 PM",
                                    "Friday: 11:30 AM – 11:00 PM",
                                    "Saturday: 5:00 – 11:00 PM",
                                    "Sunday: 4:00 – 10:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1130"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1700"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Spencer",
                                    "author_url": "https://www.google.com/maps/contrib/110375326456157546487/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-YEbMCHzVrRI/AAAAAAAAAAI/AAAAAAAAABE/u63a53fBq3g/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "Last Saturday was my first visit here - the food, service and atmosphere were all impeccable. I cannot think of a single thing to recommend that the restaurant could do better. We enjoyed multiple bottles of wine, oysters, lobster bisque and I had the Shrimp & Scallop Saute. We capped off the night with their signature absinthe and the presentation was fantastic. Will definitely be back soon!",
                                    "time": 1528731545
                                },
                                {
                                    "author_name": "Zachary Freeman",
                                    "author_url": "https://www.google.com/maps/contrib/117945900443810091320/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-RDZ4UfWVFxs/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3RTMgoO-twAMpYBkIEYnjTgEHggA/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "a month ago",
                                    "text": "Seared tuna was excellent! Sides were fresh and delicious. If it wasn’t for the service I would’ve given this 5 stars!! They put me in the corner (I was dining solo) which was actually kind of nice, unfortunately they also forgot they sat me in that corner. Slow on refills and when I asked for the check I waited for more than 10 minutes for the server to come back without my check and then ask if I just wanted him to run the card and bring the itemized receipt.  There were only 4 parties in the whole restaurant.",
                                    "time": 1525141369
                                },
                                {
                                    "author_name": "Mark Friend",
                                    "author_url": "https://www.google.com/maps/contrib/106933504286905805122/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-OiWuOcVXhD4/AAAAAAAAAAI/AAAAAAABQz0/dXGftTk9ZeU/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a week ago",
                                    "text": "Great food, environment & wait staff. All was professional, courteous and spot on. A nice recommendation made by friends., which I now pass on to you. I highly recommend !!",
                                    "time": 1527906627
                                },
                                {
                                    "author_name": "Jennifer Peelor",
                                    "author_url": "https://www.google.com/maps/contrib/118426302047746750680/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-Xr29HDStrx8/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0FEk8Z0eTSJ5gjz07HVImXk19rHw/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "Beautiful building and the food and service was amazing. The food came out in an even pace.  Most of the menu was gluten free and they are very careful not to cross contaminate.  Bathrooms were clean not well marked to where they were plus down a flight and a half. I do recommend the tomato bisque soup without croutons for gf.  Pricey but well worth it.",
                                    "time": 1521318140
                                },
                                {
                                    "author_name": "Scott Williams",
                                    "author_url": "https://www.google.com/maps/contrib/106006325149595957009/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-XtbijNmZU0s/AAAAAAAAAAI/AAAAAAAAACE/ZwtVDkNZjz8/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "5 months ago",
                                    "text": "Absolutely phenomenal dining experience. Quality, service, and consistency are the hallmarks of Blue Point. Our server Lisa provided a perfectly timed meal with no detail left to chance. Lisa has a strong command of the wine selection as well as the menu. She anticipates every need. We request her when making reservations. The entire service team works in concert. Every time we’ve dined there the GM has been overseeing the front operations, ensuring every detail is attended to and greeting customers. This is not only a great dining experience but also a great example of a highly integrated team. I highly recommend Blue Point!",
                                    "time": 1514782601
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAvNGfuxaZeuuqliWpUbTos0rd1D6Kcig-UFEOW53RJHnXPgCl5oQciJ1vpJPlmUT1ajfCE8BWKrUfrLn3RzDNzJxiItTbP4sK9BKn4rFus9ejEhCnsGFEDVJV8v70g6-1EhDKhOqd0po-z6VinHjLbncLGhS8RjuTNxhJHja44Q4e-ApMCQE5aA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA73pcXEbxhEgEIzFwOB6Kysx4foMLRNQfHhWmQEnJsd8-uQ_364uqKhQJgDmu1nCdKHNL-97C9jN8xpxSg2BFdwuHyJlRKymCcyuByYFC_ElKPHzhlFrBdTjeecQbQHyhEhDeSvDMeSpfdjC_q6Q1m4m0GhShoMJeoOJBtgnJWXWFox5aKLhOsg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAamKioKpj3oSIa6BcNeriCpMs5hLiKXteZpNSwDAhXeSNMqhHe5XScdlXE9lE7DGaiqyUIp7Z7Ceqb1smhUo8n4djGDiIGUnvx2xOhq12KPow-73xFxDqycBjb780VOmcEhBAUXNmuBi7_4U1qtCKx6aXGhR5vtZ4dkAuaOcXz0-O1lqEiDQFPw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiX9keePWfBZziHSnAnzFvn9HhUK3uslUtZ6iu-JanTbzhMTZ96OQ3CSFR1D86mJ9VzK3G-l5ZkYFaMJ-dO9SK7ycOTKVbB7LuId7LlTHCZCKzXUUyap28Rb0M_pUq_KaEhDO4WF3YXL6kAoqTbpE9qihGhQfT8RL6HahsjSq1SpmgiT45oCFnw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAvSE_UCgBXJX5NyPUVslqoatIKKJqJqamTZ6wjo_ajFuqG1zIQFtdUx4aerC0RruVugEb_kDgUQG-CChZT5nLeSvwKyykahUqPTE0_UR3vMc0QmvWX_vrziFm_NLziZ5qEhBVnQ7e8Da3o2a0pK4p_nG_GhTACHN_m9jrYdNugUXN2uvNuPpqCw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAb6xtcx0FAPln37XNzcUY6Swo-wSwvue2hfNDRuApQ0VwYqP8xeU3BZxz40GvzIBck7SyrUNxbnKaQddlKvrmbDuk9WEtXeKlyaWtbBP-RiGo2a-rycEG9b0HGzrKKm4NEhAm7aYDj6WlRuugTyOW3t5DGhQmzspFrQeqMJHLzd39awhkC0ETJg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAIjv_-L873cGDoQ_OYMGQwE7vLsOKMjqbUwX6DLjq-xH2qvQ9O31W6boAEQY9csTzaP9vFnPdh8P8BQSeFwHC97-bDssNG_WtAC7zAyMx8TIBHGSv6sqI0pHQF5GbfuJOEhDZuYTLbFOfw7QG6sOmDCceGhS0CwgbngTSP3VUaYQmhlm3uXzK1Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjPw_QnN-XQ4S0PF6c1NwTsX-GPPOFzt_MSGNvIaX29guNSx5FNczokChwzVuaeYnG3w1cBr_5PmikGocDl6P06m7T2XhSaj3XPGTV1cfFCpbMrbnjtldMw1GzwvuYZGIEhAio-2Br88aByO-QoI_zV7uGhRtrmnKmv-uhvliYf-3TIVY7O6U0g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAedy828vlPiF3D8qjyjZyFeMRHJPCcM2Gy_coLNvhENy6KDOcQWcLSb2vfZfXA2nWCWUBvYYdhfbQoLiRrds_roNTu-T1CEZtu31PwKFJPhhHR-Ujf_s_tBuw4hnaVYv8EhBN80tM7qIvgwRs7z9OtwUNGhSYQqlhDAfhSb3wcEYBXDTzqbtjmw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA_fSvxih3WYOY99FWZgNLTpV2lL0Emf4zWZww2RP4LMZsKuU54yM99qZc_P74-Sq8oV4dyWPfEHCibxiGQR6xhoAEE6wtvNFiVXP0CT8kz_xEC36mIjYHWkz0RU28immVEhAHtv62X_xvRUkav_PacL7NGhQ0BTrjxvhqwo7pFXmeXod0_CI4wA&maxwidth=400"
                            ],
                            "price": 3,
                            "rating": 4.6,
                            "category": "food",
                            "subcategory": "upscale",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.49967530000001,-81.69895679999999&markers=color:0x82CA75|41.49967530000001,-81.69895679999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "needsUber": true,
                    "category": "game",
                    "title": "Standing Room Philadelphia Eagles v Atlanta Falcons",
                    "classification": "NFL Football",
                    "timeUserShouldGetToStadium": "2018-09-06T22:20:00.000Z",
                    "date": "2018-09-06T23:20:00.000Z",
                    "isTBA": false
                }
            ],
            "date": "2018-09-06"
        },
        {
            "activities": [
                {
                    "date": "2018-09-07",
                    "name": "Heck's Café",
                    "category": "food",
                    "timeframe": "breakfast",
                    "startTime": "09:00 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJRcYVnWvwMIgRv_gImwUBHoE",
                    "phone": "(216) 861-5464",
                    "address": "2927 Bridge Ave, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.4841234,
                        "long": -81.7082626
                    },
                    "website": "http://www.heckscafe.com/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 11:30 AM – 10:00 PM",
                            "Tuesday: 11:30 AM – 10:00 PM",
                            "Wednesday: 11:30 AM – 10:00 PM",
                            "Thursday: 11:30 AM – 10:00 PM",
                            "Friday: 11:00 AM – 11:00 PM",
                            "Saturday: 11:00 AM – 11:00 PM",
                            "Sunday: 10:30 AM – 9:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "2100"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1030"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "2200"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "1130"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "2200"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1130"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "2200"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1130"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "2200"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1130"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1100"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1100"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Glenn Meyer",
                            "author_url": "https://www.google.com/maps/contrib/112295770417297012306/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-y6G0u9k1o68/AAAAAAAAAAI/AAAAAAAAAF0/xPKqVQv5TJc/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a month ago",
                            "text": "What a charming and adorable cafe! For as much as it feels like Ohio City is my home away from home, we didn't know anything about this place until recently when we randomly stopped by. It was late and we ordered a milkshake to go which was quite delicious. We decided we go back for dinner sometime and we were not prepared for just how lovely it is inside! It feels like you are eating in a garden or conservatory, so much natural light and just is extremely comfortable. The food is quite delicious too. Would highly recommend, especially for date night.",
                            "time": 1526337420
                        },
                        {
                            "author_name": "Beth Mann",
                            "author_url": "https://www.google.com/maps/contrib/117838064810316233740/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-vqzK9qG2PJw/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0AlWtRT_UWZERIWQ5eaP4XdAS_9A/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "in the last week",
                            "text": "Food was amazing,  Lots of options. Took a large group (21) easy to get a reservation and even made a last minute change in time with no problems.  We were very impressed that every single person got exactly what they wanted.  Service was impeccable.",
                            "time": 1528977558
                        },
                        {
                            "author_name": "Jonathan Juhasz",
                            "author_url": "https://www.google.com/maps/contrib/102425889048171053320/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-nNZcsltWzy4/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1tl0tf-fwaCqLt_CdvJ_jOoZ_dPQ/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a month ago",
                            "text": "Rated as one if the top 20 burger places in the state if Ohio. I agree. I went last weekend, and then took Mom this weekend for Mother's Day just because it was so delicious. This place has beautiful atmosphere. You feel like you are dining outside in a courtyard,  but are in a beautiful dining room. The menu covers a wide range of options. I had the crab cake benedict as well as trying 3 different burgers. You can't go wrong when choosing, all dishes are amazing! The s'mores milk shake and the pretzel salted caramel bread pudding were very good as well. Go! You won't be disappointed.",
                            "time": 1526371978
                        },
                        {
                            "author_name": "Sarah Gonska",
                            "author_url": "https://www.google.com/maps/contrib/108384060973789186517/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-N0ZUDqxEJDk/AAAAAAAAAAI/AAAAAAAAACk/w4xiPghq6_4/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                            "rating": 3,
                            "relative_time_description": "2 months ago",
                            "text": "Wouldn't recommend breakfast food here. We made that mistake.\nHowever, staff was very accommodating, friendly and the building is gorgeous in the back. There is a beautiful, winding stairwell covered in foliage and they have an extra party room that can seat 25-30 people for events.\n\nPlus, I’ve only had friends tell me how amazing the burgers are.",
                            "time": 1522891465
                        },
                        {
                            "author_name": "Tim Oshatyuk",
                            "author_url": "https://www.google.com/maps/contrib/107120267705550345175/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-1XhXxGoQcZs/AAAAAAAAAAI/AAAAAAAAARc/cW9GErYMOm8/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "Food was delicious! Our server was Lyuda; she was super polite, knew everything about every item on the menu and even hooked me up with a free peach cobbler which she found out it was my birthday! The interior is extremely cozy and cute, with a light and fresh atmosphere decorated by greenery and a natural light. HIGHLY RECOMMENDED!! Best date spot ever",
                            "time": 1521421816
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAsN7jzcrSI-QUrm_BcPHizEJWbqj7BGAyjXk3DH-D7lNsDYAc2RMNsLwH41D8Cn9xTZAIzPNp4ZDCKkQkOoNyGuxzkV5wl-H3GBhRENf5lCmSZwYASM0Y2SkY0rbPzvw5EhAu6UeOVoU51TZvtbjXfZ59GhRfPuBj9HVc3YtFctjiLfg_nzbGxg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAccKf71J9cC0YVBw4J1Rsogg66piFs4CJ41A6PsKHeprUXmmdThqhb0FhgotRdRbrsm1PMlUImesGN3ZN5napC3p1qliYp-8mEWjR5XHnMIZ4D9s2sBCWjiANiPMl8xmtEhAIh6B0SmiFG2jeMvHzFFDFGhTEgtnnQpNTDbzvvmug9bKeo0cNpg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArlOBk_x7wYUIXO1b9Pq5NSRD_SSpzq80Te-lVOMs2f2cVQx-f3u_tlNFCt0wMHEc3ULdqilxfGOYeCwQsErP--6kCLmt7ZHQHQyXF2BgExdxUYkRh-pNNH1H-UDDsbsIEhAydJfYHFqwNqvNV4sSin7sGhRQPcOaCVwvAC-vq5HQWcqnwStrHA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGUtyB6yyYKworicN8JhlgqqpIDLsdZNThfdK4bkwkW3Bas2OMsSwOVhAz0NQHFOSBPKNWhdLD3tpH86SHUJ_JrDquaFsgyci4hEztSarB5_3F83obTFWbDFrSU6OGJYREhBD33dbV5KN9ntfGkiZk699GhRP096FG-omr4bppuYb8-dKeQC1yw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADHYzIYrtIrmVxUVgl8qID1VtwMGJ2JD9MFG_VDa9axATxQoCx5-5ho64Ui3r5-MSVpemgwtMHM_vzxb7cBDl3Wg-2auiidx9Oa5SIhdR_eT5Y8QG0sC_TYBgeaQwIcZnEhBBm3kkNeAmvLgru8c_tnCaGhRfOEUxJEHQScpmLbHfw64PJdmYXA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARFkNwgbJVqaf8_TXpga1CRL32FpYM-Mmt4p2piCxMcgh8Gq-JGPIGeUgg0ewfX_xUz_RdxjEb5ziZ29K4WRn3gMOc4R0Xa9ZqsysCRP09KUgetE9vcsoPp9Jn75Rc7gdEhCJDBM50CMswhA1H4VuBJV0GhSjNiZRCmQ4gHDT2CkKpvI_mgdaig&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAm-kw6nZGfjlb517BB0Sxib7aL3kPWc9zTj3KuUMGKpf5STMJoPWHvfOh7zepWMaKbGHZ07Nx9Bbm0ZJOwb1qul15LEtond_1cjz3Cci7KtEpeZixG1Ayo0bSPIDkmvTQEhAC0oG5a9YudNNfDUo2RFghGhRNCvgl14CK42CO_qxA7AgYff7udA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAu51fcVmf4flBwaPc335iIzxpBH41CoKQ22G16Ex6sZn0xS6XMgNq0WuT8ksb4d7ChQ0tJowh-Gptp-5ynR2jx2GvTrZUTV7AjA94VFQ8CF12JeSDKYWlDpAbFODT7K-kEhC3lx-nhWFjOz1Conu-sJ70GhQm4_Xaz3XFMl20BrcbZqm1jHAsXw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAybi4a9ujIJjPzn5T-duXBy8Bgdwm8vbGSW3CuHF1O1JtUx0UrLVNSulKYM4n-YvCvvI6N-gmD1so4FpuW1w_DwpPegqlLgTPJ1LvG4rEzC3K_Ozeyt_e8ypu_VFCNUPlEhD_alFfsbenUNnCx5CPRet2GhTFb8GBJFXEwFSm8JsKVoOMtoBaDQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAVfzDwx6AHrRR4h7Mf7iZ_nZAu9DI_MemqO4pu37VeUFQRv7iK7TBuQQXl2E09TgW2kvcPyPFIRjw7equAOXZ2jMeHZipwxWpEI-36femxfIRi8G_1YJo2qIfWFxy8dgnEhAU36GYltn4yPJToNlQtfsxGhQv4gTr08iWm-b7QClYwnsfbFgaGQ&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.5,
                    "subcategory": "upscale",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4841234,-81.7082626&markers=color:0x82CA75|41.4841234,-81.7082626&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-07",
                            "name": "Adega",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJE6DsqoD6MIgRis3ouT-rMtY",
                            "phone": "(216) 331-6289",
                            "address": "2017 E 9th St, Cleveland, OH 44115, USA",
                            "location": {
                                "lat": 41.4998867,
                                "long": -81.6859458
                            },
                            "website": "http://www.metropolitancleveland.com/eat-drink/adega.aspx",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 6:30 AM – 10:00 PM",
                                    "Tuesday: 6:30 AM – 10:00 PM",
                                    "Wednesday: 6:30 AM – 10:00 PM",
                                    "Thursday: 6:30 AM – 10:00 PM",
                                    "Friday: 6:30 AM – 11:00 PM",
                                    "Saturday: 12:00 AM – 5:00 PM",
                                    "Sunday: 7:00 AM – 10:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0000"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Kay Farris",
                                    "author_url": "https://www.google.com/maps/contrib/115952270565386296370/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-aVKo6C5aFik/AAAAAAAAAAI/AAAAAAAABLQ/S46y_5KQV7I/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Great atmosphere in the heart of Cleveland's downtown. So much to see in this in this wonderful hotel, that just happens to be pet friendly as well, from the rooftop bar to the classic vaults and the lower levels where private parties can be held. The menu is not only expansive but extremely diverse and totally well thought out by the chefs that prepare and create it. Whether your choice of dining is vegetarian, vegan, gluten-free, or other restrictions, the staff there can make it happen the way you want it. Just let them know your preferences. The food presentations are beautiful and the wine selections and bar offerings are very accommodating. It is wonderful place to go to to feel the vibe of Cleveland as well as the history of the town. While there, be sure to check out Azure, the rooftop bar and restaurant for incredible views of the city. Or if entertainment is being offered in their theater, Alex Theatre, take a look at that,  it'll definitely be worth your while. There is much to see and enjoy at this lovely restaurant and the incredible hotel that houses it.",
                                    "time": 1526240194
                                },
                                {
                                    "author_name": "Mads Grams",
                                    "author_url": "https://www.google.com/maps/contrib/105315683608238242899/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-Xo4niHhUypU/AAAAAAAAAAI/AAAAAAAAABo/1Qg5q4UDnyo/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Best Greek vegetarian moussaka I have ever had! The way that it was prepared I had never tasted before I believe they put a small amount of raisins which added to the extraordinary taste. \n\nMy husband had one of the fish dishes, and he enjoyed it thoroughly. He said, the spices were absolutely wonderful, and it was well prepared.\n\nThe wine list was absolutely unbelievable. There are so many great wines to choose from. My husband enjoyed one of the Reislings.\nI had a long island iced tea and it was so good. The fresh squeezed lemon juice was very refreshing.\n\nOur waiter, William, was such a pleasure, he was the best. He was such a kind and compassionate person, one of an old soul. Even though he was rather busy, he took the time to talk to us and make our visit more personable. Thank you, William.\n\nThe decor of the restaurant was very nice, a lot of wood, and it was very open and airy. The restaurant was spotless, and that means a lot to me and my husband.\n\nAgain, thank you for a memorable night.",
                                    "time": 1525637747
                                },
                                {
                                    "author_name": "Brittany Hennings",
                                    "author_url": "https://www.google.com/maps/contrib/114794586332735523559/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-Q7C-QXHN-54/AAAAAAAAAAI/AAAAAAAAEFA/97lgYrSM-80/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "We stopped at Adega for Brunch after a morning of exploring downtown Cleveland. The restaurant was pretty empty, but it was one of the better brunches I have had. The breakfast plate I had left me filled up and feeling like a made a healthy brunch choice. \n\nThe server was great and the restaurant itself is really cool on the inside.  It has a very cool wine cellar in the middle of the restaurant that really adds to the charm of the venue. I would like to go back to try their normal menu.",
                                    "time": 1522943376
                                },
                                {
                                    "author_name": "Steven Giallourakis",
                                    "author_url": "https://www.google.com/maps/contrib/106513678270605399622/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-KAiw6-HvX-I/AAAAAAAAAAI/AAAAAAAAEGw/KxHFQDNdtkI/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "3 weeks ago",
                                    "text": "The burger I had was good, the service at Adega was also good. Everyone was polite and kind. The food did not wow me and for the price you pay, I think there better restaurants but overall a good restaurant experience.",
                                    "time": 1527186932
                                },
                                {
                                    "author_name": "Evelyn Kim",
                                    "author_url": "https://www.google.com/maps/contrib/105354397649251667590/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-uJFcnqZb1EE/AAAAAAAAAAI/AAAAAAAArg4/Q3MG5IOBgYA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "Quality of food was great. Portions were just right. Service was great, with great atmosphere. Located in lobby of hotel and right in the heart of down Cleveland.",
                                    "time": 1528205386
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAel5ML_b_bUaYc-pzGrh_fLzmT8j_HAAuCVifLri_Scu6nwA6vgMGsPj3KmtXuHtnM2QV5cItSp-unL8nQZdRoku6L7a9uRAM3e4CBi4fD4nLXCnxJnMqW2k4dLenYsvEhBhKMDdVJUgW4bd04lensRHGhQJc3a-jNipdi5dvCaBag3T0xXahw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAwD5moNoEXZhEz2QyttKJM_lRm8Cws5qdQhv_7h8LGwBtEWGtivueP2mkvNPTH94mbxukDx2yVAqzZJrypW1_r9Nqepaa8P2ThHF6nCDogqR3CMdGklkGGY_1GWVi8aUREhBvGKBVJukfq2dl2Iq1UPjeGhTBP-QTLZYllP6PCQXF0xM7wQFYzw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAASGLUXR5WHlsfmCS5fiisLpjtV5VBkmzGw7-ftK8wJst2VjHovgLE4HNBbIgMd0GoUG7RCuOGwT_uFP3mawNUj_0xzsdo8AvPzFveXwooLkU29P9kML5FcgBJErNiLswPEhCv06xwr0ltqKSZwskX1ishGhToxG-TGdzpPDqUJfTNLpWnG4Q1pg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADnjXejTqJkP4KL6VlLBkXestX11DwnlXxSjuGaxw30vwHAxbFswdbG_pIGVU8biweTjvA_0gRwT0gnJibRhut4NzJRVIybUUwFGvv7xS2RnjmpkA8xxD5gBZUq275BpdEhBfoQt0RxAs5wOPUiDQEhhgGhRh8hf90s8rKljyEmfR1lbOoczSig&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7ezUWsA8IoLgMus9WDtNjosjrbUkL6Wzl3dYYLsNS3DppfcGhuJXosOPfM1GEsX5BBW0i7U-Kgf_1Dq6VOxBtT5J3mH8PCvu2UXKO5LtZsElgB-wjKp2nedp-piFUfaYEhDAV8Jc86toBboIuGIBkTu5GhRoiZvH6Xm3tCi2LqI_btMqi-3Rtw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-shh9moK7AQQBBOu2Mu_ixqI-0h4UcBR8Jf26gKieONSXrV5eHp7tKke-r8ZidSxhDvBvV3omVQ8q4ISPtwDizodk9f4HRGM4bnsHwD2c6Lap1bX6xeHU2VDGJWInHs7EhDjpYNfin2ApG-fJFBEcENCGhQbBjxW-s4F8HaXwxsjRQUx9hcKWg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAD4OWqRKylqUjsJxJWy2JYxY6Y_DwBfbPeBpp648BHwGNKvumvjsEh-GQ1O6XYUs-HN1u7fK4aiWqtbS8sLWm-1RXTyCdkFRzUsv0RP5ubQLxsDyPBlNEwBCel3bjVViaEhAcVWaGYr0_DKvSmWAza-ZTGhQJFLVbwZkc6sCDn-UX44vOeKpH_A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAACzPZbdz1hO05YS5kx3K5FjE9sfnQR_M3pdN1ltLpBSKS3oNuBuwHFOvvXtKLwjA8kcP6o6IN48Y4d3xK3bhQSAFRdbrVNVA8xpUMWKe1hij77ag0R_HrrsqSkgncjEZxEhC6iC8q1RzfZhs7l_XC3tKsGhQ1OWpPrfL4TDZSe6QPa7PJVFuChg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARVf5prw8YaRbY1jVAMMFetVlcNL2wdgukfNXDC2fV6MgEeNP8Hzeqar2dsffZIkl-vD7PlB2aBc3q4cwd2iq5i9W1RCdr5idrQzk62-ApNhEqYGann9IWIqxNUBZYfnaEhDdDp6FfTxEyD2in5BPfrKeGhSjIo2jlE0HSVcAS-h6kLVDVzII2w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAThVYs_ndOKw9tKmME3TRQI7f-iqUGVY7AGFsOYExC1ofsgEGL9gxMhFIklUxzjMfLqnBOy5kqvro0oTv-ZQMS9gUm3uePPjxMn87kymXXK5OmYHpZGnlKwUspQbnwkZnEhCqz61aDmFDxDR0TPVcygbJGhRkKFHT1DIX1dBxQrYVMAo_wMZETg&maxwidth=400"
                            ],
                            "price": 3,
                            "rating": 4.3,
                            "category": "food",
                            "subcategory": "upscale",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4998867,-81.6859458&markers=color:0x82CA75|41.4998867,-81.6859458&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-07",
                            "name": "Lola Bistro",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJXbkJPYD6MIgRbSBLp6BJa18",
                            "phone": "(216) 621-5652",
                            "address": "2058 E 4th St, Cleveland, OH 44115, USA",
                            "location": {
                                "lat": 41.4987854,
                                "long": -81.6902375
                            },
                            "website": "https://www.lolabistro.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 5:00 – 10:00 PM",
                                    "Tuesday: 5:00 – 10:00 PM",
                                    "Wednesday: 5:00 – 10:00 PM",
                                    "Thursday: 5:00 – 10:00 PM",
                                    "Friday: 5:00 – 11:00 PM",
                                    "Saturday: 5:00 – 11:00 PM",
                                    "Sunday: 5:00 – 10:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2300"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1700"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Melody Long",
                                    "author_url": "https://www.google.com/maps/contrib/104173581705830236221/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-Ozi1c9yCT6w/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2UGwp1P5OKFuACvk6NWl9bOqxI6Q/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "in the last week",
                                    "text": "I give this place 4 stars because the prices are outrageous for the portions, but the food is amazing! The service was excellent too. I got the lamb and I was satisfied with my portion, but for what my co workers got I would have been mad. This is a place you go on a special date. That is what i see it as.",
                                    "time": 1528676696
                                },
                                {
                                    "author_name": "Sy Hwang",
                                    "author_url": "https://www.google.com/maps/contrib/104791409236533442747/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-18EJjmQ4Jg8/AAAAAAAAAAI/AAAAAAAAeuA/zsiGPtf12Xc/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 weeks ago",
                                    "text": "Made an online reservation few days ahead and came here to celebrate our wedding anniversary. My wife and I were delighted because we got really nice seats. The level of service and attention from the waiter was phenomenal and the food was great. I didn't really get the hype behind one of their signature menu items, the beef cheek pierogi, but everything else was on point. The rib eye steak was one of the best I had ever had. They also surprised us with cupcakes and a \"Happy Anniversary\" message when we finished our meals. It wasn't cheap, but it was a memorable meal.",
                                    "time": 1527009193
                                },
                                {
                                    "author_name": "Joanne Grebner",
                                    "author_url": "https://www.google.com/maps/contrib/118064865714054840499/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-glS37fIqdy0/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1uZ1jRWQ5IQPMAOnRhuVm3PBoHMA/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "All food was beyond delicious. Fish was perfectly prepared. Hanger steak also perfectly prepared. Wonderful deserts; creative. My husband and I had a deconstructed s'mores. Great fruit summer deserts also. Very knowledgeable servers.",
                                    "time": 1528036662
                                },
                                {
                                    "author_name": "Claudia Botoulas",
                                    "author_url": "https://www.google.com/maps/contrib/103201589269042817366/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-v0Wpdxh1mqU/AAAAAAAAAAI/AAAAAAAAAio/kRI1KoRRAp8/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "The bar service was outstanding. The food that we order at the bar was great. The presentation was so cool and the portions were reasonable. Price is expensive but worth every penny.",
                                    "time": 1528295567
                                },
                                {
                                    "author_name": "Hanna Kutsar",
                                    "author_url": "https://www.google.com/maps/contrib/108705816950001288150/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-B2XbHjDv940/AAAAAAAAAAI/AAAAAAAAABo/fKNtjWJxMM4/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "Delicious dishes. Amazing atmosphere. Out of this world deserts. Everything looked and tasted wonderful. Will definitely be back.",
                                    "time": 1527893613
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAI5oiQWrRfSrCq2yN73ie-sHcGLQc7vrJ_RIHzyp7K2EOkUazTcrpACy3355yI-uJ2O35Oh8Lfxicr1wbhjD4nAHgX3j_NoaXtGsmUpNtwmOm_3yYIAAydvqDEhDBqjjcEhDvjN1bOphS9fDLXZi_KFdbGhQb8l1tQSsqjT_Hu1Mjp_UvtH5aBA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArd97oEV9Q7UboQiai7hyXRw5yHJi7UMkFg2mxCECWFD5oij7Gm4-c5-gKOvC57wL_ix_NbBxC6Y3_jZXznxsCbbOX_ZKzjz9RHSjpLqr-QXVJgrZos-iV3UbgNAQuefvEhDxuvisBWzXJ7SaGnX8hUqDGhQZBIK5dClI5UbzcCKGU1JKiegEHA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnvIKKOEx3Bjy2JqM0tkkzi-u5xQ3S-kCALrzuVc7lk9MwkfNpGOLfaN9glX4wQZwOoN4RQcgzepX-hhViXe8Cg0tId83bEm6DdKruCtyQ0RR4-kgndEigfwCK-QmG4ivEhCmCuvosg2l6ey43Bcb4aEbGhQKZUQG5E6mEclVNaJHIx7b5fBRFA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAv30ASx-v-deaWuGiGL6FXJ9xTLZIWCE6x_Vid2P5k2vq1ZTObbrCFh4WIST6CWsmwt7wsLXRpbQ6zRzCw6e9CI39PkAUkwQolQ33d5Eq7lqfc01zOydyr0XyfqRRRJFkEhAkSNyPG1xvJPHS5fmrgPdOGhQRMPVkSY26dDcrGA8XEX7H8JQPpA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAeV3McU7O_y_4a5YlrphaCuDAECR0GJBMaeZadS-j8m5yVvPpa1JDccTYfDJtxZUP-rPzCdwwERaS_HfWO8gOAe8dYE4_F3woHPKmWUKk1h2YM2dtcoQz0MFKP1_tLw-FEhDyHv9nen-BlEfFOXupVTXeGhQFTbj6xZ0Hwa_bQFFlKqwznEyaAg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7OF4X0x_AyKuxAeECGpucQW6E-fBji-hOnwaP6l87IEVt6leyuRTc_LAv0eGOnGt619frGNeSYt7yznF5KEmAoGCA99J3R9sa05rg-ClkfnZhYhz4JNJpbMthQ3-YwdtEhDiEwVylyyl0RLvE1Awx_XYGhRl1Tqe0WsnO1b3SWfiisDLJkiz-g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtsy5XSjoTTpTlSnLIDKDGnrEbblX1uFI6esUbWqa_KeVwkjOOx4UFdKw-jOpUCCj1xTz-XYkwFbMKBX2HKw_9vqrHdP1h-9V949-lcr5BJNs8ky3CecDvF4lvZqDDI0yEhAxOqUlAE8SNH5yzafRGSBlGhSdiPcF-V2_H7ktUPB_oU66iEsXPw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAzx_KohHByxaUdq23xK_kQpr6yTX00NwSqyYGaZEqlDSUd3b3WTcThXkbjTnwCyex8YnLekZwyI5JhKLKe682qa0gqngfSoI0SX3WJ6I5cMUi12R87XcEgDlOL3XaDh1_EhDPjznYDaaX13-5BY1W-HMfGhRZgiXloKeCcrwPSrlNTmXWufx4TQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAA7c7uafPLa92CpkUw9q6BzyXdAp2d6gEkNZ9L24kOSYVYf1mrDsGA3wzdqcC-DY-IlxhXQVbgO7HILaOIF7QOYcgAEWbW2m9yKrXy8NXyFUaZwfm2XNE5iVM8Zx2JPoVEhCDNcKJxxwW9XJ_Te61RuUUGhSql8I2C9CsrFf77byvxLnoGsHhiQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAqGPw6xewS12p6Cr1a-LtuDJTYwsoPqTdxzqZxz9ZyoBTu-wZ8_l7XLn6xY9XlYaPSwzyTybEQXHdYQD7wdels2viBHpYXv56if7nxTmmKF6-Ke6kyG3FWIK7B-jrHIduEhB3oLZz6Qu8_rgA_nSCQneUGhRqy07e6YXtbheLg05k-jpWvfZ3XA&maxwidth=400"
                            ],
                            "price": 3,
                            "rating": 4.5,
                            "category": "food",
                            "subcategory": "upscale",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4987854,-81.6902375&markers=color:0x82CA75|41.4987854,-81.6902375&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-07",
                    "name": "The Children's Museum of Cleveland",
                    "category": "day",
                    "startTime": "10:00 am",
                    "additionalTime": 30,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJndgldIX7MIgRYSYwIAVP6WM",
                    "phone": "(216) 791-7114",
                    "address": "3813 Euclid Ave, Cleveland, OH 44115, USA",
                    "location": {
                        "lat": 41.50426299999999,
                        "long": -81.6598549
                    },
                    "website": "https://cmcleveland.org/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 9:00 AM – 4:00 PM",
                            "Tuesday: 9:00 AM – 4:00 PM",
                            "Wednesday: 9:00 AM – 4:00 PM",
                            "Thursday: Closed",
                            "Friday: 9:00 AM – 4:00 PM",
                            "Saturday: 10:00 AM – 5:00 PM",
                            "Sunday: 12:00 – 5:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1200"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0900"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "0900"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0900"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1600"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0900"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1000"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Jessica Orleman",
                            "author_url": "https://www.google.com/maps/contrib/116454579013934020539/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-7G8V9rlNr1M/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3_ATxhah4hKM36fbAd9xl5ju2LeQ/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "a week ago",
                            "text": "Fun for ages one to at least five. Free parking, nice small gift shop, pleasant staff. The water room is great and very clean. The other room has lots of fun things and excellent quality toys but is very open. If you have a small child you will have to keep very close eyes on them which is tough when it gets crowded. Also hard to play with multiple kids who each want to go separate places. Well worth the membership and we go often. It would be five stars if the play area were broken up more.",
                            "time": 1527862165
                        },
                        {
                            "author_name": "Joshua Yurman",
                            "author_url": "https://www.google.com/maps/contrib/112960860713565114026/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-nq8mWio7WAs/AAAAAAAAAAI/AAAAAAAAB-8/py2HKyA95pI/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 weeks ago",
                            "text": "This newly renovated museum is fantastic. Well worth the trip for younger kids. Pro tip, if you decide to get a season pass After experiencing a trip to the museum, bring your receipt to the front desk and they will take that amount off of the season pass. Great stuff for children of all ages however younger children will enjoy it more. Mini kitchens, tree houses, water tables, science experiments of all types, reading Nook, and so much more. Well worth the trip",
                            "time": 1527251917
                        },
                        {
                            "author_name": "Danielle Fox",
                            "author_url": "https://www.google.com/maps/contrib/103041124714152746308/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-TrE5Vy-t2Lc/AAAAAAAAAAI/AAAAAAAAADc/q5rqKRc3prI/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a month ago",
                            "text": "We love this place. Well staffed. When volunteers are there its always fun because they enjoy engaging with the kids. Book book is very fun and love the variety of books. Wish more popular series were in the books like Piggy and Elephant, Fancy Nancy, Pete the Cat and other learn to read series. Water area is very fun and great for all ages.",
                            "time": 1526236034
                        },
                        {
                            "author_name": "PTAOM dotCOM",
                            "author_url": "https://www.google.com/maps/contrib/113457484865742918057/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-OR0cZiP8Sbg/AAAAAAAAAAI/AAAAAAAA6sk/bIaVkss-sdo/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "a week ago",
                            "text": "Millionaire's Row home turned children's play museum. Upper level has several dolls and dollhouses under glass including a replica of the museum in its gilded era glory. The lower level has a water play area (smocks keep kids pretty dry), climbing area and little library with reading nooks. The first floor has an art workshop and gift shop, and a common area that was hosting storytime during our visit. Free lockers with digital combination locks and two dining areas where you can enjoy vending machine snacks or outside food are convenient. Lack of outdoor elements/activities during warm weather months was why I gave only four stars.",
                            "time": 1527884298
                        },
                        {
                            "author_name": "Andrew Fleming",
                            "author_url": "https://www.google.com/maps/contrib/105794479569972658460/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-nvWcHA9hTLM/AAAAAAAAAAI/AAAAAAAAD64/yOGA17NE-h8/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "2 weeks ago",
                            "text": "Much improved. Upstairs is nothing but dollhouses which are neat once, but not something I would come back for. Kids older than 10 may feel board. Parking is great and access is easy from the street. The new water and climbing area are fantastic.",
                            "time": 1527632016
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAsHhjcj74--uJjfdT3AW1FlTdpS8HeVw3xLnDTmh-1bAKFfbuxy0xNBaQb_nXBICMx0CeoinGh0KJGusNv-hQhxgIbKeR1OSPR-oN97KUU3hCIBMPzkFvJasPJJmJXn3_EhB6qiH_ixxuHjfw8rNVLrIUGhTxbW2lqwKzfpdTAmH8s08bYvkKkg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEvuornK0_sFqxWmugIgTSqzw1CeVlitrczdxVRCEhTV2t8TWLb3oI7-4vRma-69NhwIwznZiq0pNcVZiQ1N3rU_9Rbz-jSkX36Wg6ngEWPeSUCmBex4aaTqaBto1BqEOEhC_uBv5xR6zf6_g9F8Xjkq3GhR-3cRnbI84Cl1zVEmzX8hChORU8A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAG8ITEU-3_YciwYqIT-s1_tor8DYaPC4JyfiRmGF3-HtYqetPwFGobLWQ-7HGoQp0WjdeirfZ2g962N_rVy4C-n-uod8EhZQ_BU6a4WGv7uhaR4uuBkGJO1XoA3NCpqDGEhCzCvrYXIIKofSBdQJKuZvWGhQLCTbsIilIasnTM3LUCtUiZqs3lA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAI-HiS3lxI_8-y71OrFtDGEKfINHMFHm7jYNMbZQ_hooT2i9T3OfWYsjB3CMiQQywUieCB1Gvwah4LX8KpNCL4Pja9nazQhcoSgJrmTuA3SNshhcH3VBnfTpdqDnpX836EhDTFW-rLQhy7hgRvQ3oT9ymGhSteOOzNxdp9XSMBcEXrfvvBq8lXA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlB912nwEYbIjmXC1iszUiCjinWetl5iTE9pYc5sLfTTtMe6YURtOXIozn_IsUscnAakoSkQh3ICa8rTinXroe0yhhjHZr9HG5frUOHBk1AlXv2VtR-lLjMwpgNJ_a7UREhA2vkhLcXDhX-i3wqVvkODHGhSspPigQLRE08xkdTghir4_hkgImg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQ6ROhhbypLLEALWLWDoI81cbXWxRoy4JZ8QK1-MaWnR8bKZkqgqPNfcCtmcdrpPCgEmwWng9vdJrcQmWPXWPcUniEuBWHS0DaS2A9MRkgOVdzhEaEWR-yD-45sGYbAmgEhBXfGKhF9gHxnAtV5EO44uYGhRCoS-OytlJu2AJIg-TsY_AEfMuQA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4TES4xSGXjvERufMfy32tenceeoQaOVeRuDiKM4Nu_VWOs-Up1pT68yynVym5MoBMHVk9txjlt0cs2WpwY_hgojRc6WMhwxTL528VlwVgEtPKVl-5QAOoy_QwNaDVeCOEhA6c9p_nfuULvT_kbSVw-leGhRDtdBXIcTr2lME-H4XbbaS1bm9MQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAmrNVG8S_3iwKbJ5mEvItDfPTiLz7Wpt5rZsoY2c7bxEUzlFPBrjV2jQrAVAnaPuoHn5jD2O8Yt09Y4-C7-lpRcs4DC6X5UvVnF7HNOaet7trBypI7UPzWaDa_f23ZdOEhCaF8FDq6KKEQLpgCwKIKhCGhTaI5_UJYYZTKGf_7DuVA-lbrGt1w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtRy50G2cjxwiLjboX5ezpboLAAlQCeWoWUHzKZIyEapi-_eteSSZCA3qViQJhGaOsagAfmK2Oac_4shd7kpjp3W9moriY5ckoZJsob-xFXs9IdXuhVO7VY5TPjjMWOkjEhAreNuZg7jxZnbJBLRZHReLGhQtlhod6w8QuTwq3e7SD5wdcIPc5Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAg0d7hmc4brkqc7-lYHuBy5hjNxCKb44lC9OMn7B3XQGgiRPZVcEounAKSHbsL5lepnOU8OSC2rUsYrvJvwgrJEcMt-Qas-zA5h04xrkjoZ96ZU0-IA9Cg_bbz8j7jRfCEhCgSNv-QP61H8oLQdZD6nlDGhQWt0OeXwz20CeIrLCl62Yq0R3i4A&maxwidth=400"
                    ],
                    "rating": 4.5,
                    "subcategory": "museums",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50426299999999,-81.6598549&markers=color:0x82CA75|41.50426299999999,-81.6598549&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-07",
                            "name": "International Women's Air & Space Museum",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJxUifk3L6MIgR3xpGawBAbVA",
                            "phone": "(216) 623-1111",
                            "address": "1501 N Marginal Rd, Cleveland, OH 44114, USA",
                            "location": {
                                "lat": 41.5114652,
                                "long": -81.68994459999999
                            },
                            "website": "http://www.iwasm.org/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 8:00 AM – 8:00 PM",
                                    "Tuesday: 8:00 AM – 8:00 PM",
                                    "Wednesday: 8:00 AM – 8:00 PM",
                                    "Thursday: 8:00 AM – 8:00 PM",
                                    "Friday: 8:00 AM – 8:00 PM",
                                    "Saturday: 8:00 AM – 8:00 PM",
                                    "Sunday: 8:00 AM – 8:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0800"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Raymond Michael",
                                    "author_url": "https://www.google.com/maps/contrib/117537669751823283507/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-kw5Eh-1Y368/AAAAAAAAAAI/AAAAAAAABs0/y8R0CGQEgCA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 weeks ago",
                                    "text": "Women.....without em' we would be nothing. Literally. They not only give us life, but they have and continue to contribute so much to this world! This museum helps highlight the amazing things women have done in the aerospace realm.\n\nA small and cozy museum filled with some amazing facts and artifacts. Everyone always wants to go to the large and well-known​ museums. Don't get me wrong, they rock. But, small museums like this one is where it is at! \n\nFree to the public, it is inside the Burke Lakefront Airport. You literally just walk right into this museum. The staff here is absolutely amazing and will answer any questions you have with a smile and lots of information. I had the pleasure of experiencing this museum first at a Yelp Elite event....but have been back several times since for a few public events. \n\nNot only do you get to learn a lot about women in aerospace, you can watch the planes take off from the airport. Really, a great experience overall! Take your kids for a few hours and learn more about amazing women in history​!",
                                    "time": 1526826180
                                },
                                {
                                    "author_name": "Karen Stoner",
                                    "author_url": "https://www.google.com/maps/contrib/116768764476416600685/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-EARx5_pLBJo/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3tn57uU7Oc0nXm2Wnw_J6b9Sj54w/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "3 weeks ago",
                                    "text": "Events here are amazing and well attended. Great gift shop and volunteers. Exhibits free and easily viewed in the small airport, but sometimes too dim in there.",
                                    "time": 1526664264
                                },
                                {
                                    "author_name": "Sarah Kiefer",
                                    "author_url": "https://www.google.com/maps/contrib/116932646904047231188/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-erDU1aUVEl0/AAAAAAAAAAI/AAAAAAAAAaU/JY9_ZTPK41M/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "12 months ago",
                                    "text": "The museum is relatively small, but is free, and very informative and inspiring. The stories of these ladies deserve to be told! The exhibits are fascinating and they've done what they can with the small space they have. I gave it four stars because I know there's room to grow and I really hope this museum does! ",
                                    "time": 1497895154
                                },
                                {
                                    "author_name": "Taz Rich",
                                    "author_url": "https://www.google.com/maps/contrib/108903918580167894168/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-rQSbA3ju5Qs/AAAAAAAAAAI/AAAAAAAAHUU/R7sReigLG9I/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "in the last week",
                                    "text": "Ok.....different",
                                    "time": 1528923958
                                },
                                {
                                    "author_name": "Jessica Hogan",
                                    "author_url": "https://www.google.com/maps/contrib/100650612759117474671/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-_sb8heOEp9Q/AAAAAAAAAAI/AAAAAAAAAN8/b-pQonNb6y4/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Pretty cool place",
                                    "time": 1525660322
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7sGSbqRYngxV5pYC5HziiqXJKFk4rjpBNrOln1-SjvzIasVPr3LUlFctw3r1VaM2oI0fyAyJtpdrP3PSNcnrnWkdri13W13uPpOcnLJag15E_ZjWHjLpeShXNC97kMu_EhCoKLy0C5m9h29k6WDK24pWGhQR08sBXszxTlZvbKznTK4UYzT8RA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtNm_M_rbSPwMD6D-2voSLL77ks_X0xuXkqoLErM4VVKWb7SmFb9EI9P7VbJLr_5x7_0S4S6n0jOIbBe0KCJo89bnLuxJGjULGKrKQLoqRYz0_O5TOUo_cMCk5qndoNyIEhCuwALEXmFHNjcpElY0RX_RGhS7GIXLFllFVreLStEWsblA7uXwdg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJLpdJw0Cecq6QpsceBm598yheVsoDr7IV3WKSnSxtbNNoShZhihAF1J-2IdoyVj3BUUT4I2PSWPQB4kfC8csPedRTDKVaKvjl1zuNE6BcUJzbDLm7I_nnbzLF0W6A5vdEhB_6mMyoONIItKBqR0herqRGhTFlvCBry1F8UQfbDHL09ML8cwhhw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWujuiO-h7WvGoBtkWc02N7jKUzq6TcBIzqQkgwvtKnS7LeXlX7tnIgNaYDPsCuUjwjwbq3got9XBbkIzAuAOBD_C3kFHzrYhKd8CDIbE_ctuNxUZKwAAFWBfPsUF-w7sEhBH5cy4urWmhBcgY9KfACgIGhRtkd9TFT0EFdZJl5Xq4d0WDaKlbw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmch7YzqQmHjrp8kC9osQZIK6uBGNrPE4WfB1nnNWz_1vVnP5G6s4x_8p-Pnwrmh4BQPnDZXjo8XJTvP-rBy0xSvWR1pdrOsMsMOPnANEDq05dBsJpIvmfocUz9jzTR5wEhA9Ekrw96zSU0ZpUAPDbe7zGhQrQdDt_GxRxCa3L7CAhqhSuoKSBg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnBHOUm2WD_-o2I1FvN1z_3ROSE8HADooDRyZGhkY3owxQh3y1rMFpn-11d00Dslv45iY_Q2Uy8y6VOgjeXYmnjUP7OuHjZqF2jaKm9NGu9TlA24dA__TafVXgB4eMnCzEhD9SY3UD__8TtworV_5YdQ-GhSNN2xxtoS9Y7bkvD76LruuT_8Fuw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAwEgAFAWfE479Ga2xXcbeiZx9625CZGvhxED1O35-soLhOrSwMAyINNc4hOADp1TefXszhCQ6IgBeN24Mt_is7iIKwUDIWxbA29w-mvVYBDFvxUbJCfXnoSy6wbOP74iOEhAYvu4YazLPbGsuv9F2wka9GhQ7IBESC6NEF-DXp10H8qszHHdh0Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAVb2R0Kwn8zHBqNCAiyxubcEd9I-v_s5Or6qk-xMZpAKFGyjNa2-4MmVTzNHUlOlgkTiSpmwQr6Xjy_25eYIvsRiTecuo31GA6kLKZqc0hZeTxkqkvkxwZSLbBxwGtAd2EhAtdL-nsynvR7NBVVFSqcEcGhQhFQCxzpnRueqMPiFtW79Zf12fDw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4tIr9YXoLGot_sZq2eRVvTAlE-GNeZNlQhzquBAd7RZXDQqEBEEhhhR6D2qg_AuPcuJyNjKfcW5DxzvW9u3XtN8i7oldqPMVWL5gph0-YIlhJQV6k5OudoZw796nt42dEhCaGGqGliXoRFkzXu3KcnXIGhSsPGK_bpx5NO5B1RNW1X-PTlU2aQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADIPAOA4wZq7dYxahW9dXQM6K2u5kQ5JW3qn-Cz21I3sGDoiQ7FQMXUXixKQ6_JomQWKDhHU4L6zfGs-B4q0Kf5tfjYweYEtz1cCUWCVe5OT2qVJWjFv8kRvGTqlM2Oq7EhAozMgwoQbvCHUf52EFIthLGhQMZJ6hTg1Dv5UsUGP-8o9pZ6LNqw&maxwidth=400"
                            ],
                            "rating": 4.1,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5114652,-81.68994459999999&markers=color:0x82CA75|41.5114652,-81.68994459999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-07",
                            "name": "Museum of Contemporary Art Cleveland",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJY9wmPaL7MIgRNG6tdSc1YL4",
                            "phone": "(216) 421-8671",
                            "address": "11400 Euclid Ave, Cleveland, OH 44106, USA",
                            "location": {
                                "lat": 41.50891499999999,
                                "long": -81.604643
                            },
                            "website": "http://www.mocacleveland.org/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: Closed",
                                    "Tuesday: 11:00 AM – 6:00 PM",
                                    "Wednesday: 11:00 AM – 6:00 PM",
                                    "Thursday: 11:00 AM – 6:00 PM",
                                    "Friday: 11:00 AM – 9:00 PM",
                                    "Saturday: 11:00 AM – 5:00 PM",
                                    "Sunday: 11:00 AM – 5:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2100"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1100"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Romando Muhammad",
                                    "author_url": "https://www.google.com/maps/contrib/104907889280004411188/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-eM129Hb_aC4/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0EbHIfM1faA8S_qV8H2ZzKVjYbeQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a week ago",
                                    "text": "Really nice place. Its new to the University Circle area. The shape of the building it the very first thing that steals your attention. I was there for a party. Really nice building.",
                                    "time": 1528085337
                                },
                                {
                                    "author_name": "Lindsay Heller",
                                    "author_url": "https://www.google.com/maps/contrib/117150823184076350972/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-E1fiSMzlOGE/AAAAAAAAAAI/AAAAAAAAADg/goXLPOTPPeY/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "3 months ago",
                                    "text": "This is a wonderful museum with ever changing exhibits. I don't always love everything but there's always something to appreciate. The building is very interesting architecturally and there are plenty of open spaces for events. They also have free first Saturdays and a free party at the beginning of the season. Wonderful.",
                                    "time": 1520459697
                                },
                                {
                                    "author_name": "Cansu Sener",
                                    "author_url": "https://www.google.com/maps/contrib/113323015392808840316/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-SW1yrZ7XLQU/AAAAAAAAAAI/AAAAAAABNVo/L06ZM73nvno/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 1,
                                    "relative_time_description": "2 months ago",
                                    "text": "What a big disappointment! I had so much expectation to see cool contemporary arts but literally there was only 5-6 art pieces and that’s it! I was shocked! What a waste of such a great building. Thankfully, I did not pay for admission! First Saturday of every month admission is free.",
                                    "time": 1522982777
                                },
                                {
                                    "author_name": "Brandon Brennen",
                                    "author_url": "https://www.google.com/maps/contrib/105181433693475341565/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-gMuVHfOL-7M/AAAAAAAAAAI/AAAAAAAAAIY/WMFVNaGN1Hc/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "If a person on the street asks me how to get to MOCA I point in its direction and say \"It's the building that looks like an ancient space cube filled with women wearing very unique handmade ear rings\". I like to go to the rascal house pizza place across the street from MOCA  and eat an entire large double pepperoni while looking at the modern art.",
                                    "time": 1526422059
                                },
                                {
                                    "author_name": "Anna Stone",
                                    "author_url": "https://www.google.com/maps/contrib/100985523335380285275/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-aWRMFFD2Ock/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2S00EHssoCRPZ6xA6agXBDc4Zh3A/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 2,
                                    "relative_time_description": "2 months ago",
                                    "text": "Building was cool. I just like a little more soul in my art. Also small gallery space, was expecting so much more, I've been to museums that have had less space and packed in tons of works.",
                                    "time": 1523232418
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAvQe-zARQ_W1w3hZreDvg-nCH7-X9d39VCtqpYS5nOaHsweYByNGH5ZuDwU146gPED9miztABnUp39vzJznSzxidIwszgaEk-WMH-FfXlTh-RbcEp88VqsVRkacmJJP8DEhAWiuXTAHXuTV544XdWuGC9GhS7FGxxCU7Pa27sjL4g1dc5nJuKuw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUNi7xxlgl2_l2zS7RrPZY1S_-melSxQVd03zMLQrdsIwEACeWsFZ1sL1l5pQKPWw0LZRFt4MiulfhB4-CEd8Hs_CJ95jJRqtaSm--FtkoVO_sAwRdyyOQiX6gCdIoFu0EhDP9EcDCLWJGKNcd_gffPiDGhSEpr5Npvl_WyHkvu5QSl-Iqi8bhA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWnCvzUqp5mw7oNuIzzRyNZTda1lHof94iCJnffTcQhd0fKYmjP1_YpbTyrmgpHXZ4RhRJwcFuDhaJOBVx2cBLkPdLy9mcgmpSZ4mkFMz-g330lmUrWwnvkHqXUNChUlmEhDz86Z9oqhDX1iFNij35UlHGhTLy_vWSaSHLmA2wa4yRWLPn9htdw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlV9PESMw8u5Him-vSJEQdD9eSc3s2jhip84qUXlDV-c1uCMBzfMPXuHA6kcDKaojat4Oh6dWSaRgdBi5a89gkK-2UwRcVL4iRiw64ZzTxcd0-MZ23hegrjWVghpwekXfEhC3n5t1ROqrwkZYq6wj2kbuGhTkxX0cv6De7VplE-8g2CB_G0e6oA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAl3fICACa92CTiI1sTPm3onL2u_7CW3F-74ZNzI1L9-sSuElz_n9uId6EXuw_VJ5rKCGr2JWhXJm7Dt42m6vRtnre_M_urz03PpK5aw76iZ7AqEdMUeHg82D6XMIupovZEhDzJtTE9Q_hKecMxb3KPXPYGhRnqbf4O19u8ZD2uZ1rQ17ew9ut_w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAV_13Ce2Z6yqXkd_R328rjdnNYkIffN6r9JLS677jEsOs83OVAaxrb03di4tVN4MTEbS4ucuBYjWelcTublAshiizJddfXqXLPOmzxy2gBIG4EKH5S3umCYb6aJANfg3jEhAY31JVmGRxIgdI3AvG5hSvGhQUjsn_weJobttlR8ukyGydveLcoQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA3wE5xabn4_ShuncNBIobnqjxiGGKArZuuqqu6ZiHRcXna2ovDl_pfnrtRoo-WF8FVWqxscJkSN1Ip1EBb5ZhX8Gm48TOlyjWkI9AQR_ugaPurcuxDuzsexhxDpG0_AxfEhCQN31KWeCLIR96D785keqGGhSOtyq8WcO7pXjBFhw6CwBWM98bPQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtHnZHvEV2NFNTXaPyj2DE-051XwywePTpOuCDMIdT8J23DMrhyLi8XgGPFDNG1JOnEPvR23fnCsCdr6sns7UwhdNqDk3ietVhY6ACIPIu0oKRrISQ-H8kUK7-2rHsHM0EhC-hnRx_Xr3XdszQiIFc82hGhS1_EkGdRwFUhKSd62Zd_YH1GK-6w&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAglSntg4B6vRFCaHIThVzVKtP_EHVmV3Q14VxCIKHS3eHfaaX9TrbnxDMX1Bu4PIogRmM_lCsl3zLYl1EUZ2SJMPokH2bTpr7mHQKJDsP1PbPoqhmFWEaL0JkRWp1350_EhAL9DGUv3dVIMFD6lg4j8YKGhRhXrlo8dmzTQcZJDp6ZwAoSZ6aFQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA28P-HhPdJ07bHEEfMrbzD1s6tM6oUPzrcY4TFPBMBSD0iF__iyecYgGoOW8OQeUVS_BDrvTtlTOs_XPW2mh7OKFWy7yz7ZumgRYR7-GYqIKwl-EdBaC6-L3IYMdWdkifEhCyZAEUsgMmnOSOzsn0XND3GhRaAXeqlexz7eDp3P6LOwPe7XN3pQ&maxwidth=400"
                            ],
                            "rating": 4.1,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50891499999999,-81.604643&markers=color:0x82CA75|41.50891499999999,-81.604643&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-07",
                    "name": "Phuel Cafe",
                    "category": "food",
                    "timeframe": "lunch",
                    "startTime": "11:15 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "id": "0G-WFdOu3_KW3mBZJQq5Cg",
                    "phone": "(216) 795-5175",
                    "address": "1350 Euclid Ave, Cleveland, OH 44115",
                    "location": {
                        "lat": 41.5006907,
                        "long": -81.6824334
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5006907,-81.6824334&markers=color:0x82CA75|41.5006907,-81.6824334&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "website": null,
                    "hours": {
                        "formattedHours": [
                            "Sunday, 08:00 am - 08:00 pm",
                            "Monday, 08:00 am - 08:00 pm",
                            "Tuesday, 08:00 am - 08:00 pm",
                            "Wednesday, 08:00 am - 08:00 pm",
                            "Thursday, 08:00 am - 08:00 pm",
                            "Friday, 09:00 am - 08:00 pm",
                            "Saturday, 09:00 am - 08:00 pm"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0900"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "0900"
                                }
                            }
                        ]
                    },
                    "photos": [
                        "https://s3-media3.fl.yelpcdn.com/bphoto/c7jHefAaQwUPrpToPTfIxQ/o.jpg",
                        "https://s3-media3.fl.yelpcdn.com/bphoto/6AGE5Wp4qTVjiYqvXDtBew/o.jpg",
                        "https://s3-media2.fl.yelpcdn.com/bphoto/8d5i40OT5HPf-e7BjPzlLg/o.jpg"
                    ],
                    "price": 2.5,
                    "rating": 4,
                    "subcategory": "fastFood",
                    "backups": [
                        {
                            "date": "2018-09-07",
                            "name": "Nano Brew",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "liPSeXaAfv8jxRGJ717VmQ",
                            "phone": "(216) 862-6631",
                            "address": "1859 W 25th St, Cleveland, OH 44113",
                            "location": {
                                "lat": 41.486057,
                                "long": -81.704407
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.486057,-81.704407&markers=color:0x82CA75|41.486057,-81.704407&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Sunday, 04:30 pm - 02:30 am",
                                    "Monday, 04:30 pm - 02:30 am",
                                    "Tuesday, 04:30 pm - 02:30 am",
                                    "Wednesday, 04:30 pm - 02:30 am",
                                    "Thursday, 11:00 am - 02:30 am",
                                    "Friday, 11:00 am - 02:30 am",
                                    "Saturday, 11:00 am - 02:30 am"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "0230"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "0230"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "0230"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "0230"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "0230"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "0230"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "0230"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1100"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media3.fl.yelpcdn.com/bphoto/hOVVagc4-2VVwpP5Q7Ik3A/o.jpg",
                                "https://s3-media2.fl.yelpcdn.com/bphoto/RE2e9C2LRUkhCK8TkHPorw/o.jpg",
                                "https://s3-media3.fl.yelpcdn.com/bphoto/Bq6bNL84WXyc0ceiiDnifw/o.jpg"
                            ],
                            "price": 2.5,
                            "rating": 3.5,
                            "category": "food",
                            "subcategory": "fastFood"
                        },
                        {
                            "date": "2018-09-07",
                            "name": "Hotspot Cafe",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "pWyhmTVRNw6hix3J__SqvQ",
                            "phone": "(216) 239-1141",
                            "address": "1332 Carnegie Ave, Cleveland, OH 44115",
                            "location": {
                                "lat": 41.4971496422818,
                                "long": -81.6792781693115
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4971496422818,-81.6792781693115&markers=color:0x82CA75|41.4971496422818,-81.6792781693115&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Sunday, 07:00 am - 02:45 pm",
                                    "Monday, 07:00 am - 02:45 pm",
                                    "Tuesday, 07:00 am - 02:45 pm",
                                    "Wednesday, 07:00 am - 02:45 pm",
                                    "Thursday, 07:00 am - 02:45 pm",
                                    "Friday, 08:00 am - 02:45 pm",
                                    "Saturday, 08:00 am - 02:45 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1445"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1445"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1445"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1445"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1445"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1445"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1445"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0800"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media2.fl.yelpcdn.com/bphoto/_bZI_NiursamlmLi6zMl-w/o.jpg",
                                "https://s3-media2.fl.yelpcdn.com/bphoto/vLDTWLGtV9TojAXaAzguDA/o.jpg",
                                "https://s3-media1.fl.yelpcdn.com/bphoto/Wziu9T1H1ozBgmHIbO1DTQ/o.jpg"
                            ],
                            "price": 1.25,
                            "rating": 3.5,
                            "category": "food",
                            "subcategory": "fastFood"
                        }
                    ]
                },
                {
                    "date": "2018-09-07",
                    "name": "Severance Health & Wellness Center",
                    "category": "day",
                    "startTime": "1:00 pm",
                    "additionalTime": 0,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJHTS6ksX9MIgR4pQwE8YEx6I",
                    "phone": "(216) 321-7246",
                    "address": "5 Severance Cir #106, Cleveland Heights, OH 44118, USA",
                    "location": {
                        "lat": 41.51585599999999,
                        "long": -81.547927
                    },
                    "hours": {
                        "formattedHours": [
                            "Monday: 9:00 AM – 2:00 PM",
                            "Tuesday: Closed",
                            "Wednesday: 9:00 AM – 5:30 PM",
                            "Thursday: Closed",
                            "Friday: 9:00 AM – 2:00 PM",
                            "Saturday: Closed",
                            "Sunday: Closed"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 1,
                                    "time": "1400"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0900"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1730"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0900"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1400"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0900"
                                }
                            }
                        ]
                    },
                    "photos": [],
                    "subcategory": "healthAndWellness",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.51585599999999,-81.547927&markers=color:0x82CA75|41.51585599999999,-81.547927&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-07",
                            "name": "Partners for Behavioral Health and Wellness",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJSdYOvroCMYgR4H5MxD294B4",
                            "phone": "(216) 342-5496",
                            "address": "24800 Highpoint Rd, Beachwood, OH 44122, USA",
                            "location": {
                                "lat": 41.4574757,
                                "long": -81.50342429999999
                            },
                            "website": "http://bhwpartners.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 9:00 AM – 5:00 PM",
                                    "Tuesday: 9:00 AM – 5:00 PM",
                                    "Wednesday: 9:00 AM – 5:00 PM",
                                    "Thursday: 9:00 AM – 5:00 PM",
                                    "Friday: 9:00 AM – 5:00 PM",
                                    "Saturday: Closed",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0900"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Greg Edmond",
                                    "author_url": "https://www.google.com/maps/contrib/107433163193408679153/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-bgXj8UNOoYE/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0Uek14P1ymBMgM2QphUkhClQnyzQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "Great people work here who care.",
                                    "time": 1519333998
                                },
                                {
                                    "author_name": "Beth McClellan",
                                    "author_url": "https://www.google.com/maps/contrib/109027793903870876606/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-kmX4Dx5dJAk/AAAAAAAAAAI/AAAAAAAAAAA/VQdmnrDDya8/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "10 months ago",
                                    "text": "Personally, I and my entire family have benefited greatly from this entire practice. I firmly believe that my husband would not still be here without Dr. Philip Epstein. Among my family members, who struggle with several mental disorders, we have seen 5 practioners in this practice. I see Marise Alexander-she's one of the partners of the practice. I'm sorry to see that someone was belittled because of her name. That's not usually like them. In general, this practice really cares about their patients, as opposed to a competing practice on Chagrin across from Yours Truly. The two practices used to be one, before there was a split because there were two groups within that practice who had different philosophies of patient care. For the other practice, on Chagrin, they are there to make $. Partners for Behavior Health and Wellness cares. IMHO.",
                                    "time": 1501600838
                                },
                                {
                                    "author_name": "Ghera'deysia Hill",
                                    "author_url": "https://www.google.com/maps/contrib/113196677576771401241/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-yvT8cAP1BZ8/AAAAAAAAAAI/AAAAAAAAA_A/maj4FzMlekw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 2,
                                    "relative_time_description": "a year ago",
                                    "text": "When I was checking in to see the psychiatrist the woman behind the desk mispronounced my name. When she asked me if I were right I told her the way to pronounce it then she made the comment that people don't know how to spell. That comment really hurt my feelings. I could not believe that she let that slip out her mouth. I won't be returning to this practice.",
                                    "time": 1496009362
                                },
                                {
                                    "author_name": "Carol A. Estrella",
                                    "author_url": "https://www.google.com/maps/contrib/114014244675395243177/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-T7xxLm5V1SE/AAAAAAAAAAI/AAAAAAAAHss/UStNaEvwnbc/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "2 years ago",
                                    "text": "Very Profesional and accommodating. Have helped.a great deal.",
                                    "time": 1455117116
                                },
                                {
                                    "author_name": "Joshua Shifrin",
                                    "author_url": "https://www.google.com/maps/contrib/116457403367862685014/reviews",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-JmTxvylZEjY/AAAAAAAAAAI/AAAAAAAAAAA/VXdXJ3a_-rw/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "",
                                    "time": 1528479693
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAW1x0mwEsgJp2TuP2jTRXyezCgPtEDNFMtohh6NbLiObNZzU_yKt-LhZPdMlFVK7BVpF2FMjfPp9MRKIESQHzHrM7jeovpljoAPqOHoHIrWizfLEf-bWISaKREWzSjNsSEhCIkczIiZPfqWNi5v1xgIwwGhSDBN-JWv_zSznbk36IVSj9dKy9VQ&maxwidth=400"
                            ],
                            "rating": 4.2,
                            "category": "day",
                            "subcategory": "healthAndWellness",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4574757,-81.50342429999999&markers=color:0x82CA75|41.4574757,-81.50342429999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-07",
                            "name": "Summa Health Wellness Center",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJBWVQ40UhMYgR1wghua5HcoM",
                            "phone": "(888) 863-2394",
                            "address": "5625 Hudson Dr, Hudson, OH 44236, USA",
                            "location": {
                                "lat": 41.214427,
                                "long": -81.444119
                            },
                            "website": "http://www.summahealth.org/locations/healthcenters/summawellnessinstitute?utm_source=google%2B&utm_medium=organic&utm_campaign=local-listing",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 5:00 AM – 9:30 PM",
                                    "Tuesday: 5:00 AM – 9:30 PM",
                                    "Wednesday: 5:00 AM – 9:30 PM",
                                    "Thursday: 5:00 AM – 9:30 PM",
                                    "Friday: 5:00 AM – 8:00 PM",
                                    "Saturday: 7:00 AM – 7:00 PM",
                                    "Sunday: 7:00 AM – 7:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2130"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0500"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2130"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0500"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2130"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0500"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2130"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0500"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2000"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0500"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0700"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Carlton Sears",
                                    "author_url": "https://www.google.com/maps/contrib/101020416293430405904/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-3rCyCAhV_54/AAAAAAAAAAI/AAAAAAAABDE/afGpDlG1ZZo/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "Everything others say about it is true.  The best gym - by far - I’ve ever belonged to.  And I’ve been going to gyms for nearly 30 years.  Always clean.  Wonderful staff.  Great equipment and facility.",
                                    "time": 1523129697
                                },
                                {
                                    "author_name": "Don Drenski",
                                    "author_url": "https://www.google.com/maps/contrib/117176718425558812245/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-pgU40GtUAic/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2NdfF6OnnmKlEeBC9-H8G57xzxCw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "I agree the cleanest most well taken care of gym I’ve ever been to. Management and staff are excellent.",
                                    "time": 1520032050
                                },
                                {
                                    "author_name": "Scott Neville",
                                    "author_url": "https://www.google.com/maps/contrib/109458000620668149328/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-Xt9Jq71O5VM/AAAAAAAAAAI/AAAAAAAADvQ/IFWfpb4XVh8/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "6 months ago",
                                    "text": "Lots of workout equipment and machines. Large men's locker room. Great pools and large whirlpool in the pool area. Always clean.",
                                    "time": 1512850766
                                },
                                {
                                    "author_name": "John Dearborn",
                                    "author_url": "https://www.google.com/maps/contrib/100207376051546608234/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-ftQ3BJ-qjPs/AAAAAAAAAAI/AAAAAAAAAAA/ouOLM8ETIDU/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "Great pool, plenty of machines and terrific staff.",
                                    "time": 1528072518
                                },
                                {
                                    "author_name": "Ty Ammons",
                                    "author_url": "https://www.google.com/maps/contrib/101676933245589883388/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-qXcixTaLtbU/AAAAAAAAAAI/AAAAAAAANZk/EjE5xGHV2cU/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "4 months ago",
                                    "text": "Love this place. Staff very helpful too",
                                    "time": 1517931077
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiZXKO9zenrolNqoMjbIXc2MBV2KahiefAgCSFYBP31EYsnGiTTQS8W3jktxo9yth02h8xwIpB_bTSllyxAJiTEzxyLx_1aYOiFoIAscW4j2yn4YbJ4fivJgvH26dpL3YEhAaS7iL2z_jK9fx_WL9TkqCGhRO0DhMiL571_LLykG26pjJ4grg7g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlWxg56ZfbWNiZ_3dpZkAOxl7BMMmgYbOUhfEzcd5B4ySBqo_rnV1v5wp_uonqpNnbeFPL--830dxQkRMZW8_Xxdxa9XRFIbd7w1eAASxyggODz5Jxhd_CR8fLRLAb_4REhBFLUJnWXMPJVF_ocWkV6prGhQzWdLTdnvgC6cx_4FzOssFbD0-nA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtfQMY18y-ySAgJpydJX2hS05-KXfLDX5Gf5p9C5M2Je8sFi_0P508dhWPNTJiRVo52PBU_lbFnoRNRthTbKMwniHuE4Hdo6jWAThyywdWeiCEV487fBF9jW3zdXG3OrNEhBUrwMLN6lqjI6rJp5NowWyGhRrNV_cM9PRJP1t1hv29BWoyhbeWg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANOCSmdEZKjv-uTuqQe7vYQfZW4SoBfYg2Se1mm68wQ_N5wIgtGLNJn60HqwaSyIeMtj4esdG3Vr-WyLlDjQGxv9ktCfDcSzRp9ZALTyLfLRemPUHy856aXaj7IpGjhyuEhDBh4wsU8QwvADs8pFClUUSGhQ6Gj1HsAJbtntHYG-ial38D9nc5Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAgE0sHPYF3UvTNRLy_rtdTdejnT4oKXyitIAYt9MxfkhLJzCrO49uTezlI-DXe_KZIoHAgcWkpFeGqx6IVN3Mzy6adwxc3jZBC0_gJ5aCDDeOOZUFnoXVSkNPooTREH38EhDFgmxlHSYq2Syjrs6law8hGhQHdYdDNCMBaq0aCgnIe0I1aLLHnA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5CkYytqPepyR2VEUznCA1JsHkqQ-GECmE5Y_Dl5YYjVOmvbAqpgMmsQpgpJn7h16JJOgZ0H-3ClpQ5WKjuD23y10c811cFnJ5-mVDQEEVnojRyrfXt-dbgQsCc-m31QmEhDpCBJtioy94EIdL8g5yuQFGhTlUhpVSapu5PxFB3EgJce-11nX1A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAqK2b6sZi10yY3PP_4UuVCVeDDHcyTFEZBAJpwfWw4lZ4hnt-w1gP_lypjZvrKoZnePN-R7W1t8kC-YWRdacD1SMVbE0fiPOx2A32Wx4ScYqQzBkENpsBy4IEQKRy_6jZEhD8LiGTMOcaBIRudMlTmbrwGhQNT5tHJGKExg0aVGHuHU55b63mxA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQ7Q6EF5sTKv2WZNEePZlEVm-jz5_v9b1MZKy428c8e8sVe15IVC-gEtof9vvSTaXOjx-rEG6vWVguUacX-vRqLCHuEXYW_gGHQb__3jGrvxlibB95Vzkq0-6t0-vBWVXEhCthBSZHXTvjqscevuhK-CmGhRfT7vz4uC45bxrFb2GMd2mK8o8Bw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAdQzVxqYQGsvcAMAmdA3nDs6DCHjIE0zRzmk9rL64aDTf2kZxgf1WujzrAjCRHO807TcwSNFt-5QM5nAwXbjaZZoZohNw4RSHA-nxvWWIP_BiXiMKdROAwZk3M12q9yDnEhBIRFNXy6dSF1z7P1TRdbtbGhQq6mAGyDd1MnvwYQc5zCrQ_J7q_g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAxxSM6jDTAAbynkc59dJvQjfcbflwfsBF6ycHMEPNfD0ZemXL_d2uvodXuZ8Th3KlmCvLC-eNEk20W9DxDC6TcW_YXa0RjOTLf5inUhandt1AClVIb7Md4ZPKao7u-3WIEhBVRDJZUcF1z6JbEtzX5PJNGhRjev0twD-tzy8EFjrLXravoOJKQA&maxwidth=400"
                            ],
                            "rating": 4.8,
                            "category": "day",
                            "subcategory": "healthAndWellness",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.214427,-81.444119&markers=color:0x82CA75|41.214427,-81.444119&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                },
                {
                    "date": "2018-09-07",
                    "name": "Banyan Tree",
                    "category": "day",
                    "startTime": "03:30 pm",
                    "additionalTime": null,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJe916P5_6MIgRHTsmb20I-_I",
                    "phone": "(216) 241-1209",
                    "address": "2242 Professor Ave, Cleveland, OH 44113, USA",
                    "location": {
                        "lat": 41.4813616,
                        "long": -81.6867726
                    },
                    "website": "http://shopbanyantree.com/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 10:00 AM – 7:00 PM",
                            "Tuesday: 10:00 AM – 7:00 PM",
                            "Wednesday: 10:00 AM – 7:00 PM",
                            "Thursday: 10:00 AM – 9:00 PM",
                            "Friday: 10:00 AM – 9:00 PM",
                            "Saturday: 10:00 AM – 9:00 PM",
                            "Sunday: 11:00 AM – 5:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1100"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1900"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "2100"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "2100"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1000"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "2100"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1000"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Melynda Sikora",
                            "author_url": "https://www.google.com/maps/contrib/111532928667141544079/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-bpGjubSNjbU/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0-N8QVPolc3gnhunMLO_JDJN0y4A/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "3 months ago",
                            "text": "Best boutique store in Cleveland. Very trendy and always has new items coming in everyday that you can’t find anywhere else. Highly recommend it.",
                            "time": 1520537087
                        },
                        {
                            "author_name": "Tom F.",
                            "author_url": "https://www.google.com/maps/contrib/109065173903767477475/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-2wW2AC5Lyxk/AAAAAAAAAAI/AAAAAAAAAbI/EewPk9IotP0/s128-c0x00000000-cc-rp-mo-ba6/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "8 months ago",
                            "text": "Meh, women's clothing. I'm sure my girlfriend would give a higher raring, and at least there were comfortable chairs! plus the book everybody farts is worth an additional star on is own, haha! My girlfriend visits this place whenever she's in town, and always finds something she likes!",
                            "time": 1506170774
                        },
                        {
                            "author_name": "Ryan Lini",
                            "author_url": "https://www.google.com/maps/contrib/114915318376837774122/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-On-bI0B6uH4/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3GLxMDBmjc466lKmQeE-fEVZ0Elg/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "4 months ago",
                            "text": "One of the best boutiques I've ever patronized!",
                            "time": 1517263000
                        },
                        {
                            "author_name": "Piper Wakefield",
                            "author_url": "https://www.google.com/maps/contrib/110002141537361529545/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-CjvCV7inLHk/AAAAAAAAAAI/AAAAAAAAAGI/ONtINGMDr88/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "a year ago",
                            "text": "Beautiful, airy, inviting store! The clothes are an interesting blend from boho chic to structured modern but it all works together. Some lovely gift and home decor items. Some things seemed slightly expensive for what it was which is why not 5 stars. But most things I felt were fair.",
                            "time": 1496451307
                        },
                        {
                            "author_name": "Priscilla Zietlow",
                            "author_url": "https://www.google.com/maps/contrib/107729563460533961967/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-EUHxOMwwQoQ/AAAAAAAAAAI/AAAAAAAAEMo/BOc8GIkTNPI/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "6 months ago",
                            "text": "Lovely pieces, price point is on the upper end, but pieces are beautiful!",
                            "time": 1511842886
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAK_WeHpNc1cahCefJAoZRkPGbNM-MTQQP-vxrsCcLZGYfnlhOfKs-dNbnXu55b_pjLIk9X1apMLwqnoNjYeauyn6YE5EaKrJDmlRewYh50kiR6n1k_sXKWcm9CTezIhysEhCBnfR-ugg9DUvnO_7E3KccGhS2-4lLdL-Nb-OeNOOYGRWmPdOi_w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAm0Wo4g5ukUb-JeIASXVsOY7WfPfbD62MYIPSByPQhLWQFelAVeN8lKcl7Ccm95Vy5Xxe27FfN8zEDiwj8El48ik9pRnTUS8xLMv6tyL5NtOdk8T7k53BZ2lG8O3ZBdGuEhCmMilfS8YChjXiJ6S5XnO4GhRTggdIE0o0KOuB_EivWdmz6GHl4w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAASY9TqVrTOYBW26TFvJiuufCq-M8NFCt41L44Q7FE3ZcEXUxvfEgOofvrqyFSmeA8SmcAp3zCepfCbZ4oXI7m2seJJTiBvqbdMeYdPgqTXZDd4M6XNF7YUCFMZ_ln9eBcEhApOUFo_zuzHQvfhZchIBvIGhSJtY3wuhng9aB-dXxNnW88_c_sgA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA16-1svHjfMYvRX5DGk9zanfL843I2sbgrSTbZEZTj7WFzt179omxH1Xlj-i2TZDjP5jAXjSsk0vojEXM64oKUhkl6sUhXR1n7TlS9dEK8XzdzQg9sNvX4d5Z6hydaZxAEhB32nKcF5TUzkpPxGKIxXBWGhTv5HO8jBYXT6tYJ3UG8_kdsmVn0Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnozsBuOniDUKc9uyQwkkEa9JkuheUxtOLHRE43vpWR2P2YdwLIAH0HLF1nP3x1F-LMY8nyXbhBcJZB0JeNZgSDeY846DeD_67lzFrf03OgXF1uoU4qeaExzIWI54GLUNEhDRB511W0YzyE_bakQa2ZBuGhSdWUH0W9k_KQasRV7yYK4QzG7JxQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEVtW1EGNWGJ10-cxTPRvI6FfgpPvsvBLogl2E4lmdSqKJQINBugRDgccKP9KqRbC4hClkWvLtZlqNNdV5VlynhcGBB_-i4znPOJtyhWsDz20s56tw4m78u5naBYKGPvrEhBZvSyRSn__J2HB99e761w0GhT1BGY4qVIzOm6_b3RSWEqwNSUiUg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAydgcImqSnRlXR0misF8aMPH_mT9l5iH7ezQGatUPW_3uu5Hq_OifqnW1ot6_Pti9-nRCa1kr0fNruD05BZdIvRM5BQgP0_8b0GzqGH_NUnemXtUnv-314Y_hrYF3snc0EhB8xVC5ipe4TmnWwOpt3n8CGhQa46ZMDdhuvy8WZ69sxRle4BYVjw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAdwdEaicZK-2nqyifqOqvQn2yiMpeko4IoVCj8P0AlrcJ5mDR8bpKoLcDGw0UxObi4-AYqU-8o_8hvE3DN8_jcyXSQNFBidriB7_8OjDpOqn79WfX_JYx5p0theiI1LMmEhBvHr-Jh2X9_YG1E0iZzPF7GhS8BbO4cAu9vPs-pk0xQQGbxJMV1A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYo2jaQ9kzBdWGwwHGZWiahp6uHXtPuHFkxXJAwwiYk4_QmEWpvogEdwPWRxm67Vtl3z3waqJXDbKGahEc_15S6fbDxYM32dqBWXyqaRRcraYSXfi-G1jHqcAyLh0ewu5EhAaaxgFQUVoM2w16EWg7sO4GhSwCdhJ3sA8llcCuQ1wyj-vpNc0xQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4uDKVKZ4t_MQ_5eonNAvfs2rpCJBFOe7os93Gg3OtlXRxSkdJrbIi_V3H1amgJjwKbcPYwKyu0V7kpCi9KHQnO6CzRzF-UkX5y7injIhfqxERY32crg0MGD8AMvoA7sSEhCQ5Qo-egz4yxKAyyouBzCPGhTnAeCfsfsNJNkz_Kmz4yLjERedtg&maxwidth=400"
                    ],
                    "rating": 4.5,
                    "subcategory": "shopping",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4813616,-81.6867726&markers=color:0x82CA75|41.4813616,-81.6867726&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-07",
                            "name": "The Wandering Wardrobe",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "iG4PjJqwqQ8y80cqeQVxGw",
                            "phone": "",
                            "address": "1351 W 6th St, Cleveland, OH 44113",
                            "location": {
                                "lat": 41.499568939209,
                                "long": -81.6979827880859
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.499568939209,-81.6979827880859&markers=color:0x82CA75|41.499568939209,-81.6979827880859&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Monday, 11:00 am - 07:00 pm",
                                    "Tuesday, 11:00 am - 07:00 pm",
                                    "Wednesday, 11:00 am - 07:00 pm",
                                    "Thursday, 11:00 am - 07:00 pm",
                                    "Friday, 11:00 am - 07:00 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1900"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1100"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media2.fl.yelpcdn.com/bphoto/lDz4Pj0Jz7EVpS-KB4Mf3Q/o.jpg"
                            ],
                            "rating": 5,
                            "category": "day",
                            "subcategory": "shopping"
                        },
                        {
                            "date": "2018-09-07",
                            "name": "We Bleed Ohio",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "Pf3MDPg-6XZeChQRmZvLAg",
                            "phone": "(440) 941-1178",
                            "address": "530 Euclid Ave, Ste 31, Cleveland, OH 44115",
                            "location": {
                                "lat": 41.49968,
                                "long": -81.68949
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.49968,-81.68949&markers=color:0x82CA75|41.49968,-81.68949&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Sunday, 11:00 am - 06:00 pm",
                                    "Monday, 11:00 am - 06:00 pm",
                                    "Tuesday, 11:00 am - 06:00 pm",
                                    "Wednesday, 11:00 am - 06:00 pm",
                                    "Thursday, 11:00 am - 06:00 pm",
                                    "Friday, 11:00 am - 04:00 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1100"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1600"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1100"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media2.fl.yelpcdn.com/bphoto/jD0rS0ux4BCT9ZS4onQcIQ/o.jpg",
                                "https://s3-media2.fl.yelpcdn.com/bphoto/IooFriMtBt-8T7T4fCRrmg/o.jpg",
                                "https://s3-media2.fl.yelpcdn.com/bphoto/FSySmdwTJMPVnikFfVSpZg/o.jpg"
                            ],
                            "price": 2.5,
                            "rating": 5,
                            "category": "day",
                            "subcategory": "shopping"
                        }
                    ]
                },
                {
                    "date": "2018-09-07",
                    "name": "Rebol",
                    "category": "food",
                    "timeframe": "dinner",
                    "startTime": "05:30 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "id": "KHdYW6Wl4wWXW60by60P0A",
                    "phone": "(216) 505-5898",
                    "address": "101 W Superior Ave, Cleveland, OH 44113",
                    "location": {
                        "lat": 41.4993503,
                        "long": -81.6939436
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4993503,-81.6939436&markers=color:0x82CA75|41.4993503,-81.6939436&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "website": null,
                    "hours": {
                        "formattedHours": [
                            "Sunday, 07:00 am - 08:00 pm",
                            "Monday, 07:00 am - 08:00 pm",
                            "Tuesday, 07:00 am - 08:00 pm",
                            "Wednesday, 07:00 am - 08:00 pm",
                            "Thursday, 07:00 am - 08:00 pm",
                            "Friday, 08:00 am - 08:00 pm",
                            "Saturday, 08:00 am - 08:00 pm"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0800"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "2000"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "0800"
                                }
                            }
                        ]
                    },
                    "photos": [
                        "https://s3-media1.fl.yelpcdn.com/bphoto/y2SvEJk837nLdO053Qgxjg/o.jpg",
                        "https://s3-media2.fl.yelpcdn.com/bphoto/fe4k_93dEYvEgVuttk1XEw/o.jpg",
                        "https://s3-media4.fl.yelpcdn.com/bphoto/tHfrKOXuJ_eg4Yh4jN8QAg/o.jpg"
                    ],
                    "price": 1.25,
                    "rating": 4.5,
                    "subcategory": "coffeeShops",
                    "backups": [
                        {
                            "date": "2018-09-07",
                            "name": "Vintage Tea & Coffee",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "IAbq5UuXX_hJbxTOB5suWQ",
                            "phone": "(216) 417-8230",
                            "address": "1816 E 12th St, Cleveland, OH 44114",
                            "location": {
                                "lat": 41.5017456887787,
                                "long": -81.6850134551906
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5017456887787,-81.6850134551906&markers=color:0x82CA75|41.5017456887787,-81.6850134551906&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Sunday, 07:00 am - 06:00 pm",
                                    "Monday, 07:00 am - 06:00 pm",
                                    "Tuesday, 07:00 am - 06:00 pm",
                                    "Wednesday, 07:00 am - 06:00 pm",
                                    "Thursday, 07:00 am - 06:00 pm",
                                    "Friday, 08:00 am - 05:00 pm",
                                    "Saturday, 08:00 am - 05:00 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0800"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media4.fl.yelpcdn.com/bphoto/43L7aB4lEsnG8ckxA4YHuQ/o.jpg",
                                "https://s3-media2.fl.yelpcdn.com/bphoto/syqQCN2T_jIY7FX51WSYzA/o.jpg",
                                "https://s3-media1.fl.yelpcdn.com/bphoto/aq65BbDiGATHBUYuW0p5Fw/o.jpg"
                            ],
                            "price": 1.25,
                            "rating": 4.5,
                            "category": "food",
                            "subcategory": "coffeeShops"
                        },
                        {
                            "date": "2018-09-07",
                            "name": "The Copper Moon",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "ziTgeXaM7gWRnIhPtespMQ",
                            "phone": "(216) 296-9281",
                            "address": "1127 Euclid Ave, Ste 104, Cleveland, OH 44115",
                            "location": {
                                "lat": 41.50104,
                                "long": -81.68503
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50104,-81.68503&markers=color:0x82CA75|41.50104,-81.68503&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Sunday, 07:00 am - 06:00 pm",
                                    "Monday, 07:00 am - 06:00 pm",
                                    "Tuesday, 07:00 am - 06:00 pm",
                                    "Wednesday, 07:00 am - 06:00 pm",
                                    "Thursday, 07:00 am - 04:30 pm",
                                    "Friday, 10:00 am - 03:00 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1630"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1500"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1000"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media1.fl.yelpcdn.com/bphoto/EttR2bY3xsI1bsg-xwxsfQ/o.jpg",
                                "https://s3-media1.fl.yelpcdn.com/bphoto/KaX6YTAIi-lFfIg5com1Bg/o.jpg",
                                "https://s3-media4.fl.yelpcdn.com/bphoto/e22wf8iyIOLjsw7x2p8ONQ/o.jpg"
                            ],
                            "price": 1.25,
                            "rating": 4.5,
                            "category": "food",
                            "subcategory": "coffeeShops"
                        }
                    ]
                },
                {
                    "date": "2018-09-07",
                    "name": "Jewel's Dance Hall",
                    "category": "night",
                    "startTime": "06:15 pm",
                    "additionalTime": 15,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJiafZknyIMYgRWfNTsRdK8Zg",
                    "phone": "(440) 275-5332",
                    "address": "1770 Mill St. Extd, Austinburg, OH 44010, USA",
                    "location": {
                        "lat": 41.772425,
                        "long": -80.85232909999999
                    },
                    "website": "http://jewelsdancehall.com/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 11:00 AM – 11:00 PM",
                            "Tuesday: 11:00 AM – 11:00 PM",
                            "Wednesday: 11:00 AM – 11:00 PM",
                            "Thursday: 11:00 AM – 11:00 PM",
                            "Friday: 11:00 AM – 2:30 AM",
                            "Saturday: 11:00 AM – 2:30 AM",
                            "Sunday: 11:00 AM – 10:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "2200"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1100"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "1100"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1100"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1100"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1100"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "0230"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1100"
                                }
                            },
                            {
                                "close": {
                                    "day": 0,
                                    "time": "0230"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1100"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Elizabeth",
                            "author_url": "https://www.google.com/maps/contrib/102494607198994767756/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-tZMC-hHdYWU/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1tHcY3PwIJO1tmC3JYaTZS3_y-jQ/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "5 months ago",
                            "text": "I stinking love this place. Bartenders are amazing, bands are great, people are willing to help you with dances. Customers are wonderful too.",
                            "time": 1513995381
                        },
                        {
                            "author_name": "Richard Lewis",
                            "author_url": "https://www.google.com/maps/contrib/109618137335083789388/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-kJ28JQUYU18/AAAAAAAAAAI/AAAAAAAAAF0/LYuDOriB2PM/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "5 months ago",
                            "text": "Lovely & Friendly bartenders, great drinks, great music & lots of beautiful ladies!\nI’ll be back soon!",
                            "time": 1515912371
                        },
                        {
                            "author_name": "renee dibble",
                            "author_url": "https://www.google.com/maps/contrib/116945419020348551383/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-cnRCfFN3aYI/AAAAAAAAAAI/AAAAAAAAD_E/Io5Di52_Dp0/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "3 months ago",
                            "text": "Like the place but not the bathrooms.  I can say I know what a sardine feels like.",
                            "time": 1519545247
                        },
                        {
                            "author_name": "Chriss Gerhardt",
                            "author_url": "https://www.google.com/maps/contrib/113768347660980754042/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-xuzYzaKYUmg/AAAAAAAAAAI/AAAAAAAAAU0/PbOml_VRcvI/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "in the last week",
                            "text": "Line dancing is fun on Wednesday evenings.",
                            "time": 1528642430
                        },
                        {
                            "author_name": "Gary Young",
                            "author_url": "https://www.google.com/maps/contrib/111901743850724580181/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-hmk9uWo08pw/AAAAAAAAAAI/AAAAAAAADas/ISlH4hpS5sk/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "9 months ago",
                            "text": "Great times to be had here. Been here many times. Friendly barmaids. Great bands play on weekends.",
                            "time": 1505223188
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAC_Oilw_fXVTQNA4B1KbCnkJzcQudfT_bIIv0Z_QFphg86prtjZq3mmDaOy6dAosXE6b-I5U4DNLVd9uNd4kj-5Rlr6cbqRw2ouoZcqvznKS3kucdTOQzttjsfJQBqsa_EhB1_hbGCC1EtzLAOVvCzUQbGhTvUyX-seULVwXARsuN7WnXn4tFzA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4_KtXal0RNNMU_s8TDznu1J1_KcslkR6v6G3yClk0Am0Q1UR_LGShmo68sXfv_NKuc6oAAnIliUIOHgBiZZnEVqTsdwOFzcMUwsUOdd6J3VjcDXlL2FUHjEfYDxMWQB1EhBXevlsVMnbkCTshWRURYqvGhQP-LMX7jLnRyDjGFRHemUrmgoTFQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAvgXsxhI5YjiJf5qhsynxX9f55nAXSYJkrGa3drJ9BZ5TKNYC0KFcMc8J6xiZsfftm15izUcJrf54FSn6JJ2ggTJJlS-2p2rCzxCU9YpnE5XmyTD0I1_Fu1Jo22c2mAotEhCgcF-7iC_MKVLDdDzCcNWiGhSQNgECGQeB81Ti44JRy_V40tQWvg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArpcMkPqPvvYMCevDB8tiNbOjNELsVE0jTTPXucivR3Axntds54dMhYm_-iRGBPb4cEesU3LchcMQpBaeUwh8o464JAhsVTnI6fRXqd0n3CWe6Jh_bly4ESqdBQs2CikTEhCZJRZWKZf8eOV6sRgmJS0TGhTewtLcQYixCwqX61hLStti3Piuxw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAIGaK34okuEAxKfOonxS1ObI_Kt0IVHU0pWoiu09r6b5CO2HTHoGxrtaLgFTaZ96j3g-JOIIO-oznBNW_3tSjs2lWvEIoBjd_Dvmq5dGWjIKTnmJgA6XykUAuq3GY0qF8EhDHkFh1d59pD-hfIRYUnXlJGhR--sxwNveBnVptxuOQZCQGo4XQXA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUDALKET24-cJRDLP-rZSTotEfMAFmU8dGciYMASKwglhN9Rmemm2JqpwEwaxzCtSo_CHtU9aCbeoeBhvET0xWzIhm8WJaj9ctLPT8AkHoxSq_KinUDOUszhLJS_MjntnEhDZw1q3R8_Dn4CmJcDHZhXxGhQb3pL2tzY28wVWMMCJ0JbzQ9kE9A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9Q1VeXe9Fyc8cNa60SbwNdDyNqq-UefrtczQzbrbjg3EkGxy0E3Q_JpXuvaIOB2CetMFQJWZq-WfQTFYIEPsZi4ljh2cYTWqIbKUjWYEZQwGPz5iIwWhcw6KCxHDez0TEhAobsHFky_qAnapJ_z1G-BkGhTIh1kc966GXo7NGWgtUG65mGz7pw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGquIpz9CsQ4-cUum-7iVloiOjDEo785-CKHtms9QNtY5ZKg9ginCmtRGKSFGp0tWZDOQcvMKCG8BnPap1lezZeQtTkp4bzmbRX6XKlg6Fd4IuoJzWDZpKchSLtKQ_10cEhBk_Jq6G2YY65Zvejnqs1HbGhSjtbggNci5A3mE2Rd592KPb2HXhg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAI_RjiEcG0pwXHZ4ijzgppVdrOClmc_PSxo6R43stGsYZo-4-P2NmpeMy_yGxtdBd_5jZyiTu7Fa00tMIqhnUlxgsUH3JblEwLHRZuYT0FgL0LDKT3t_VsGVk7C31ZD0sEhAfaP2wmxVOD1bKnS_R_Pq1GhR1IWduo4_NtPPTEm84522FlK0uWQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANriKfXUVx9pcDKM1fMhZ5eZHLykiVYUVEz-Z_9qQ8nTye-gL74tgfg6yDyIX8RaMAmYl9twCXbRSoYVUDC7HxgNOoe1_rNze-2TTi6hQRzntPBpQNP7TypCC2E5bAtQgEhCWlKGuG_vCPVub6T_mC_yXGhTBuH8xeZ_-bO6DDjFOTHfcuYZZxA&maxwidth=400"
                    ],
                    "rating": 4.2,
                    "subcategory": "danceHalls",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.772425,-80.85232909999999&markers=color:0x82CA75|41.772425,-80.85232909999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-07",
                            "name": "Windows on the River",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJoXWDZGPwMIgRYq1c1kl6rqg",
                            "phone": "(216) 861-1445",
                            "address": "2000 Sycamore St, Cleveland, OH 44113, USA",
                            "location": {
                                "lat": 41.4965537,
                                "long": -81.7038999
                            },
                            "website": "http://windowsontheriver.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 9:00 AM – 5:00 PM",
                                    "Tuesday: 9:00 AM – 5:00 PM",
                                    "Wednesday: 9:00 AM – 5:00 PM",
                                    "Thursday: 9:00 AM – 5:00 PM",
                                    "Friday: 9:00 AM – 5:00 PM",
                                    "Saturday: Closed",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0900"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0900"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Jared Wright",
                                    "author_url": "https://www.google.com/maps/contrib/102871022285524811758/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-1UTMH6L4lUQ/AAAAAAAAAAI/AAAAAAAAAHQ/IvpQQsTFeow/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "a month ago",
                                    "text": "Great location for a downtown and river setting. Food was good. Service and service perception was horrible. The staff (servers, bartenders, catering managers, anyone else is a service role) all looked miserable, did not smile, and did not pay attention to detail. Those things may not be 100% necessary to a great event, but where I come from it’s called courtesy, manners, and being welcoming.",
                                    "time": 1524975539
                                },
                                {
                                    "author_name": "Randy Esser",
                                    "author_url": "https://www.google.com/maps/contrib/111610766319851548604/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-_nHv836A0Ng/AAAAAAAAAAI/AAAAAAAADKc/a711U91W684/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 2,
                                    "relative_time_description": "4 months ago",
                                    "text": "Great looking venue! Terrible acoustics! Trying to hear Merry Ploughboys and can’t. Add some sound absorbing wall panels so the music can be enjoyed.",
                                    "time": 1517626126
                                },
                                {
                                    "author_name": "Scott Terranova",
                                    "author_url": "https://www.google.com/maps/contrib/105844091218871692902/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-lfTjwqpSDrM/AAAAAAAAAAI/AAAAAAAADik/d-AQ4hCJ61s/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "6 months ago",
                                    "text": "Fantastic rooms with trendy brick backdrops. The atmosphere and decor are absolutely unbelievable. Staff is great, food is excellent. All in all, a great venue for hosting any type of event.",
                                    "time": 1511385364
                                },
                                {
                                    "author_name": "Louis Licata",
                                    "author_url": "https://www.google.com/maps/contrib/113780841194112872004/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-D7N-dYrqVrA/AAAAAAAAAAI/AAAAAAAAAAs/NCY7FraYL_c/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "There for the aquarium! Great place to visit",
                                    "time": 1526004000
                                },
                                {
                                    "author_name": "Regina",
                                    "author_url": "https://www.google.com/maps/contrib/115870699011273813500/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-3D1ZqFwd92c/AAAAAAAAAAI/AAAAAAAAJqw/C2LY076otgc/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "8 months ago",
                                    "text": "Attended a wedding reception.  It was warm inside and most guest were sweaty.  However, the servers were quick, friendly and accommodating. The bartenders were also just fantastic.  The only complaint is that it was not cool inside.  It was a hot muggy night",
                                    "time": 1506269336
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAAZnqY8VUXPuoZem1kDmtzwouxP_EpHwJHS-zQisyU_02QrJrZj76Ot7CHZEQSpYM2r2aGjuD6FGOfsNi0oWXXMt98jDvybZ4SPEjeyZEd5KzW8RCtQxMk5IYgkofoCFdYEhA274dwKIwADg2GhGA_5MELGhTpk2JbfFj_uOLqcyaZkhoZ-MwCFA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWmTDbehpcPFD8lUdq3dKueQTHSqCb7lSFjkk5IO2kMtsFzm9gz03b4RUloQZ4DD9U7CLHz7xqKbfXm-SGbAEFPu7YaNomEaowrfOrpVDy3dYb8jBYRJby87Ts1Jnuqm5EhCDf3P-On_9d35af0ORtp9HGhQNb3wTWex1Nq7gF1xERykd3zEhug&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAAmsLVwXm_rYF7ii_7qy32umg-gTH3o3NIvC5L6tH47s1L-rs6Te0Swg-W2JlDNpb7rb85_MyYULdn3pbaHlmAuij286TsazhKrHcceIIqeYmpeC_W2osqR79BJnycp0JnEhCgDp_xuyfSIhHU0dJmllOGGhTTaJxoKDFMkURdcgJ99a3iNn_ciw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGoLgXatfK2DJJP3e1Rw8_LabXVKRgc_H3lgrRaTGn-sphwy6nQbkLBW3UF0CNwcw7XlJFClm5j4dnPECy2lNQCzkN0dCuDkBB7eBOJvousQcWpdQ3YJ_sDb8NijRoA8zEhCCyIOxwvTCWK50D6cOxIp_GhSkCTUyM8qQZjEMHi5vi_2HUl2tWw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAAeVJfkaBhRnjr1opDrlX9CTeRPG6KZHrULIs3QwQ8pwHx9pxMwQa6G7DQbOV23cImK1R6G19HBV2nWy3nUpqvvv3kDBS2g5pURTfthue8-I3fTnQFioZwNodZvsapfzWiEhAqHS3YwmzmFV6-1VF_0exaGhRsI45GBNc9YLAkaJdBxBkEUUvD-g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQzE6kZVpJJgfYBuy5nNpq5MpjsNs9QLj5uPblrOPff2DP3tArSECP45qsVAKvG4D1dQYmskA_zdpMvvNbdHm1PnqQfMqdkzVwdc2K9yMvhM3mZ0tuNQN_nSSOWCOZvQVEhBIgffGTRObzzdlmJPmHjJjGhQ7KIH_GaouPREloaFj52x2rzB8fQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5i1HYWPiMEWSQyZ5d4bsaUBamlNpli2ZIZZ1KiXqNSgfoTlI3mtKSstu9vkmqmlgW0UpJvnaHclEzd9rkoyO817sPEyc1VSUrJh7oZMBNkJeUecGEXIowFn8zLsoxiI3EhAQkXbMjS7vbFtmrHnEQK6QGhS3UA0HuMpUswixdnvdfTXoDEoAJw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAk5x2Mw5RNqIQ0peNVkypMDkEsyPtWWF-9i_HHpDwv9Yu5o8e-9GU1ek0cv0547E8d-pkJDbMhjxPrd2M5-3-Fm4AHsVVV2hv75xn-h_6ouqFYlJUwI_Uz1syKqFa4YW7EhA57ghdONGlCtIomD6gosH5GhSt-rWNBmZ7nfWANvP5PkQ_VrJIqQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-BIRsZiKbpzLpLlZVfE7zV_wEpQHob6yy_byPIFU48u84N05MrZGC0rFfoL2bPVmp4EFhWvzZRoSVMlUOLGaJURL5Yw5OnkQHh1y-LQ35NOuHk0QieHjqZ3EWH1taG41EhAn_AaonTjGy9bbWBJfaZHJGhT4ybvEaiZG8UnmuxLXVjCQqE4apA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAY88wWfM27Q8Y4gWIonSf-ESrVLUDbqjzdOXgFtN4A4UwLLVRnMPD2XuB-Uj5CB6Xia-x1YHlZsMgLwYNmhGQHH3bSk0-xJ3IBEizaQe8SGqN7njj2RG3A6kAGPRRij4SEhCJoN_pC8dwRBFzRzZqwFh7GhQZgZVQZLEc7ya2hNdQzsjXrO1kLQ&maxwidth=400"
                            ],
                            "price": 3,
                            "rating": 4.2,
                            "category": "night",
                            "subcategory": "danceHalls",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4965537,-81.7038999&markers=color:0x82CA75|41.4965537,-81.7038999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-07",
                            "name": "Music Box Supper Club",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "iyeanZgAkpCSL4eHoqdhnw",
                            "phone": "(216) 242-1250",
                            "address": "1148 Main Ave, Cleveland, OH 44113",
                            "location": {
                                "lat": 41.4965373,
                                "long": -81.7066267
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4965373,-81.7066267&markers=color:0x82CA75|41.4965373,-81.7066267&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Tuesday, 05:00 pm - 10:30 pm",
                                    "Wednesday, 05:00 pm - 10:30 pm",
                                    "Thursday, 05:00 pm - 11:30 pm",
                                    "Friday, 05:00 pm - 11:30 pm",
                                    "Saturday, 11:00 am - 02:00 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2230"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2230"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2330"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2330"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1400"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1100"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media1.fl.yelpcdn.com/bphoto/lU0IAqPQLLp3tTG2DJS-QQ/o.jpg",
                                "https://s3-media4.fl.yelpcdn.com/bphoto/c2PNgPdsQtJiOIrizMmxsQ/o.jpg",
                                "https://s3-media1.fl.yelpcdn.com/bphoto/g0Ozw2u6TufQ40TPFaqqPg/o.jpg"
                            ],
                            "price": 2.5,
                            "rating": 3,
                            "category": "night",
                            "subcategory": "danceHalls"
                        }
                    ]
                },
                {
                    "date": "2018-09-07",
                    "name": "Pickwick & Frolic",
                    "category": "night",
                    "startTime": "08:00 pm",
                    "additionalTime": 15,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJO30TPoD6MIgRVPcWgNwSc2s",
                    "phone": "(216) 241-7425",
                    "address": "2035 E 4th St, Cleveland, OH 44115, USA",
                    "location": {
                        "lat": 41.49922699999999,
                        "long": -81.690113
                    },
                    "website": "http://www.pickwickandfrolic.com/",
                    "hours": {
                        "formattedHours": [
                            "Monday: 4:00 – 9:00 PM",
                            "Tuesday: 4:00 – 9:00 PM",
                            "Wednesday: 4:00 – 10:00 PM",
                            "Thursday: 4:00 – 10:00 PM",
                            "Friday: 4:00 – 11:00 PM",
                            "Saturday: 4:00 – 11:00 PM",
                            "Sunday: 4:00 – 9:00 PM"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "2100"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "2100"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "2100"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "2200"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "2200"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "1600"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "2300"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1600"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Rachael Rimel",
                            "author_url": "https://www.google.com/maps/contrib/113234864894795958422/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-OjYax0XFIao/AAAAAAAAAAI/AAAAAAAAKW4/pS1c4Ow1RMY/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "Wonderful experience all around. We went for date night. The food was amazing and service was great. We also went down into Hilarities for a show where we were sat next to some wonderful people who were friends of the owner. Got to meet him as well and he was a very sweet man. We are going back again in May and I'm sure it wont ne the last time we go.",
                            "time": 1523745668
                        },
                        {
                            "author_name": "ricky ghrist",
                            "author_url": "https://www.google.com/maps/contrib/115074203666116368588/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-XjlAjXroTYc/AAAAAAAAAAI/AAAAAAAAAD4/3bTRr8zf2B8/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "3 months ago",
                            "text": "The food here is quite good. It is a bit pricey, but it is worth it. Their cocktails are really good for the price and the shows are great. I highly recommend the mystery dinner show. It's a fun atmosphere and a great venue.",
                            "time": 1519059236
                        },
                        {
                            "author_name": "Earnie Boyd",
                            "author_url": "https://www.google.com/maps/contrib/102185021348004450601/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-7Okz8SzD-mI/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2_pLyrFA1id0J8zTugK44ocTTMGw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 weeks ago",
                            "text": "Great service, great food, great atmosphere, free dessert for birthday celebration",
                            "time": 1527509459
                        },
                        {
                            "author_name": "Jason Bailey",
                            "author_url": "https://www.google.com/maps/contrib/104780225854908334047/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-1Q-GjApPL30/AAAAAAAAAAI/AAAAAAAAF0U/-VHWr7XHYsE/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "a month ago",
                            "text": "Classy restaurant with very good food. The blue cheese stuffed olives in the martini are the best. You can catch a comedy show after dinner, too.",
                            "time": 1523962493
                        },
                        {
                            "author_name": "M Morelli",
                            "author_url": "https://www.google.com/maps/contrib/110507805802857879328/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-F4G5KeM7Jbc/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3cljMZTxcgag2FyLjTqJcrjnrhkA/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "2 months ago",
                            "text": "It was my first time there. Everything was nice. And our dinners were delicious! We sat at the bar. Our bartenders were nice as well.",
                            "time": 1521654153
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAD5hYjDwuAiCLkHXvF--nW7h1eP4XObyvzW8grJ6zY_8ikpu3LHgwDXdp3ObNf0YU8_1IC_MNVCKBp4X5j5kfxWKqUGAZiie6pEoK0ifCxvwcmvfrIE_smQDj_eqhOSwEhCcWaygIgYzFzLKWkOgSHxmGhRbL7upbvdM6QA2HjZ0Z7s1CV86tg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAfnoFKK5sL3na5jXx3AcMyJ3CHfJSGtkIaNBUvKtDNAlZ0V5w3Pd5P5xHi5dRIDc-pQsfnKBlAr2spVJzi0JnlwLy9WBq_M-vEfNYxoS_wD8IuKorwXRFzjFlfN6LbU25EhBvRSm5FHV6jlPPz_S4jvTpGhTK8cGUt79jhzwuMVBHpWH3vBilpw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-DyElXabQkOGIAym6i3zud3JfXpoww72mPwmS1ZOxfoUbPwDIaemSWYsAUCBaqLgf0kcG2EkEMigdFQwo_F3ojUnCgpTRj6m-EhaF_Hx6hH6Ia0qlVDvgYAYOn-7PdGsEhDnGb9lf4R64WzhKyRJUaoeGhSJ8DYZLn7I5PgSn-xwaXwz_4Wq1w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAbuszOusLs4f2a0wB2xO3gTSfsMAlSlednq2Do8DbFbVIDkyMf_b7LdbKbfIF3X9W0XKPTJtRSB1N7Y7WTkslTcb090_sRSqFaBdN_VYdMfR9XsRPhrXDpNjoq7NCAqBQEhAJQ8M4hUnBEWndxF2JNVk9GhTWAEvrtQoDxVJaj_OYloGbdzwGiQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAHlwibskBSv6oKH70LXyKk24rY1kKITcm3_GwoUG2TTmxW7O5lKjas6_wGwZvTbJrsVTX__2p6WH2ONnc9bWG_gnvFE_ZjhxoGQ0hsav2zkExEpMmn7HCVrfBAEvU-xjkEhBwbd9So_WXGJVdP0RutlmCGhRcYKMMSya634QgIxodHC7iHzVgng&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA41lzA4oTDVsLuluCKNQ-f4bN7bReBxYsnRV4IfruXLHxxbLZ6LwCLPQ0ate_UjfVdMNdLW_rMACAntS-9M85nPXti-BaoBrSC6v5WQaIK61gVBqL5qdc-rJIpo4cgcKYEhDqnURhE6J8VRGM9j48bXeAGhQabo7195fq0k_ZO1TnF7SIlvBwtQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAdAG-XAXcF2FsveqmLSGEuW6RJaKgheyMreKKPEQty1UIVa07qL1iB6XdrtIohL27wJGH1pzSf0oBGfNIOugs00jIT202Su377YsbvOsGfRJZOIxv9lCYeJqyaCuKD97SEhAXGoehJvOs3gt6k5F7hAFYGhQzje9o626Odg7N6mx_IkNwXyhrTw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmU0DfNxanGgjLM1m7TsKOyO7xZmLdZPEw3DCf823lPOQ6e13Oxrl51wvL4OTteNM2bWw7PDm3stZcdNJc7qqdUtKIhlLq9SsQd0ORO2aRqxWoNbbj0c0-d0b0gkfqMDoEhAEmtlJkDF8Ii-P7_Nm9P57GhSxIg5Ff0EX-_vZhL5rM6dbqjMAiQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAF5ljSkxno08C4sk78EGsSAgVKKaw2duzpI2iprdH7S697HKgYz8Fzxsm31QAFU_ZRCotREzrLxuOEpigZkYI20si7vtVLi5FmkokbQ4l_YgsYK6Cdjl6OXYHsJRF-s00EhBrct5BVRbp85QvHYJZy7k1GhQYQkeIB5ME2Jja1vy2KdMnvQFdZA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAALkb-A8PpvkzBIf5PGBXux5-0eGGrPXgqvtX5Y75kC4mYDimfScTwS32KFqNx3kmPfyiqQILLuYFkurOYiLHW4snAFHcz-LVEz_9cR46r_yAryn8D4EM52WrY7Xtz5_ONEhDFbFi8_411mLzxykfF5nyBGhSa4M1kX63S3QlKOQMCMy8ZKRjgtA&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.4,
                    "subcategory": "partybars",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.49922699999999,-81.690113&markers=color:0x82CA75|41.49922699999999,-81.690113&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-07",
                            "name": "The Velvet Tango Room",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJnz6bUHLwMIgR6YPl4yHdJvg",
                            "phone": "(216) 241-8869",
                            "address": "2095 Columbus Rd, Cleveland, OH 44113, USA",
                            "location": {
                                "lat": 41.4838945,
                                "long": -81.7002246
                            },
                            "website": "http://www.velvettangoroom.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 4:30 PM – 1:00 AM",
                                    "Tuesday: 4:30 PM – 1:00 AM",
                                    "Wednesday: 4:30 PM – 1:00 AM",
                                    "Thursday: 4:30 PM – 1:00 AM",
                                    "Friday: 4:30 PM – 1:00 AM",
                                    "Saturday: 6:00 PM – 1:00 AM",
                                    "Sunday: Closed"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "0100"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1800"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Konfue Xiong",
                                    "author_url": "https://www.google.com/maps/contrib/118323868089562292461/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-Z9vCdSCcGhI/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3rY-NP7EoYIPWJmffr2qAh7-NCAA/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 months ago",
                                    "text": "Stopped by late in the night during my first trip to Cleveland. It was chilly and thunderstorming and the only other two patrons left as I got there. The pianist left at that time too, needless to say it was a slow night. \n\nThere was an extensive cocktail menu and the bartender was very knowledgeable about each one I asked about. She even gave me a tour of the backroom. Ordered a Manhattan which was delicious and while I sipped on that she recommended a few places in town I might be interested in. \n\nI was really just hoping to hear some jazz but ended up having a great conversation and a drink. The whole bar just has a great vibe and great staff.  Kaylee was her name. 6 stars.\n\nAnd as others have said the drinks are pricey but I would say it's worth it. Just know what you're looking for.",
                                    "time": 1522818534
                                },
                                {
                                    "author_name": "Keri Vidmar",
                                    "author_url": "https://www.google.com/maps/contrib/100821980423771504883/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-J_WPVFriFG0/AAAAAAAAAAI/AAAAAAAAADk/kfIlRZbcoiQ/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Our last stop of the evening and worth every penny. Our drinks were made in old fashion style keeping the grace of the cocktail and a suberb taste. The staff was so wonderful and accommodating. Class act that Cleveland needs.",
                                    "time": 1524185668
                                },
                                {
                                    "author_name": "Mitch Koestler",
                                    "author_url": "https://www.google.com/maps/contrib/100299902124525163289/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-ugETCAKtLN0/AAAAAAAAAAI/AAAAAAAAAAc/A_A1h2b6xcU/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "2 weeks ago",
                                    "text": "Excellent customer service and great ambiance. Have caught some really memorable jazz bands here as well, and always eager to go back.",
                                    "time": 1527798288
                                },
                                {
                                    "author_name": "josh hundley",
                                    "author_url": "https://www.google.com/maps/contrib/104366632016634612971/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-Wz8vWN3E4g4/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1GVuajy8FeUey1OPOqchr5IT76Tw/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 3,
                                    "relative_time_description": "a week ago",
                                    "text": "This place is fine. The ambiance is relaxing, but for the drink price the understanding of balance should be three levels higher.",
                                    "time": 1528430576
                                },
                                {
                                    "author_name": "debardelabenb",
                                    "author_url": "https://www.google.com/maps/contrib/116069667617248619069/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-NYihCwkZ5vo/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0QTImOWQtcnKM5B7xnjuSfSxxi7A/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "4 months ago",
                                    "text": "I can't say enough about this speakeasy jazz club. I love it!! The drinks are phenomenal!! The staff are friendly and professional. The music is heavenly. The atmosphere is simply divine!!! Such a throwback and nod to the 1930's.",
                                    "time": 1516742440
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGoSWvnNH7IGcFo6xwW7HJ01XSK5UjQab_BhEMG2uLJU761cTsojUEH4F-xQw_z3eM2YkZsRamoYjXXlMwcpgKiPyRbfU0jS3WaiAZfVv6y2JLhdpUH3qSMHu8tEMQ_fMEhB6rBmj1DQBvoU5-Nr6Lt5TGhTxqM9ZImSU59G2RArhleiNAfxXOA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAeBz-Xf1NwHbuZTRiMC5CJE00spcpg3ZdJVZgq2LrxyVJJG9eloqV4AxRrGNBbtcr1-hUE0Dyvgek16MtQQp_YJuSj5UlLbOaRSWAY9bsf_cq2mWBR5wnG4bcCyu1yqajEhCWPQJVg28WM9cAAx2-NElXGhR831AeC6hgnAeCRKs4ofGEmUO5Lw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAhONYrBftJxPs2ZhXxf8RnC4DnCB33wKddeScynacwKUdePDiKHMPMKCjIWlLT4Ca8em5z2q5fFgobx1z_gVJIIlTKrqn1YcWfdOgkCI7yHKADIgYN_kmcPtTe4CoJlkVEhDF9tc20cpuLnnxkyM0K_pRGhRrD8ZGjYPgMtusUoQmesVfau19xg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJBLuoL9EC5I2BKqZvVggW-cQgUYCD_7QMrZB0P8S7ocoBVUTLmODGkjZ4IvoeSxoJQoBS081N-NiOQd5_5ypMsIOE0PzV2CD8eEIeZ0OcwKD5rKUPZdoUjg5b52QFwSpEhDSBEYWQ8C2-T4Csd7t6Rc8GhRunbH85PJOoXUWwTNI-sdY4_XjVw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJFBOwvHV7OfPqTxHqfr5aDFiMROXxnNuSguYaprqPovThlGdhdKqKaMTRbO6KYl8nis4g5tqKqHvmqxwvHQXLZfjaJrEkJSH5PaOrYEI0qi2x_oZbfQ029dfxVcHLb51EhARjxAb_cfdoVWLL6zPEHDCGhTBQXYf-zRmYU8yX2vuE3kiUnWqAA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtoJLpzl-gJsg8Nnulsrm6NWNz1sLBsMLCJdYoSXhoM0jChuUTTiadeCSQZhG1WRbJj7DgwtM4TjZsq0yimEIRhgrxhBOwgBHvfcj6T1dVXzdCfEfbJbC0B4fN1FyMA01EhDBt5UTtu1QIyiGmjSYlIDmGhQTD3cTQSyfm1tPG9coG0nLUzSX8Q&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApyQ7vLk5AFuAuOOrEc-kdJD1bIQTb7ju-10V5DBbbGAGY-Q7j8l2Kso9HUNFtPmIE4V8ptU_4KrBozfqBfm_-fBT6EWpdtL9fs_7lAD5PTphxg08DhD9ERuMKqBy5vV9EhACOR2YeXo9ipuBG72HKdkZGhQhWb-_zpD4j-a6D1PdrLTqSJum2g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmvP5WTHqtQbfb0o2T5uKll4K0pcB22okIt0VEeuR2OMfS1YGpUsCDz2bAStz1UihT7FfICEAD_tWInUYX1vDwVDpF1AecFbIHlANSg2HZ2cHHFICiSJJJH5ysnXSONS_EhBnJ1LMhnrxuUoQacreZD7bGhSS26qRKf2pVxKyvzjzrVI0e_08fA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATdrwffQNaqPpQt0IQdgsI07ZGZiO6rs21yaz2hCcndoH8OVtWrPI1s5crK76H1RDXU8Qk8sd5dX6mLtADL1vyW08ew3hd2f7tZgQN81MZmhNV0pmiDdsYV-9uT5WzQ6zEhC5TmvNQ9CbNqfJ_MICpOCpGhS96yOYNS183Z11tEGtnkeVJC96gA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAG406AgH8_foLn3H4kLTNXXfiFeEeb23n8_6am6vIzXi4-Ra5VuZKpdty3sNu5X7ob-N85iEt-NFXbRDEK8KM7w3iXpCS3zmuOvh1LJz50F5-2XmlKs7DYmPz5xTputuhEhDjshmH12tgICfFNM9A0FuCGhTQbfZuM752sSkLLVYjhzUBtfvmAg&maxwidth=400"
                            ],
                            "price": 2,
                            "rating": 4.5,
                            "category": "night",
                            "subcategory": "partybars",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4838945,-81.7002246&markers=color:0x82CA75|41.4838945,-81.7002246&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-07",
                            "name": "Ruth's Chris Steak House",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJESvo4n_wMIgRGI-lmq4JSZ4",
                            "phone": "(216) 539-8404",
                            "address": "200 Public Square Suite 104, Cleveland, OH 44114, USA",
                            "location": {
                                "lat": 41.50014470000001,
                                "long": -81.69222780000001
                            },
                            "website": "https://www.ruthschris.com/restaurant-locations/cleveland/?utm_source=google&utm_medium=organic&utm_campaign=local-business-listing",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 5:00 – 10:00 PM",
                                    "Tuesday: 5:00 – 10:00 PM",
                                    "Wednesday: 5:00 – 10:00 PM",
                                    "Thursday: 5:00 – 10:00 PM",
                                    "Friday: 4:30 – 10:30 PM",
                                    "Saturday: 4:30 – 10:30 PM",
                                    "Sunday: 4:00 – 9:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2100"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2230"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1630"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2230"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1630"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Margery Slatz",
                                    "author_url": "https://www.google.com/maps/contrib/105856190835476650617/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-YOdPcfxuUPc/AAAAAAAAAAI/AAAAAAAAToY/q8woylJUF-0/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "4 months ago",
                                    "text": "We were so excited to finally see CLEVELAND got a Ruth's Chris! This is in the old Frank & Pauly's location beautifully remodeled.\n\nI took my best friend here.  The waitress was great and the manager, a young African American man from Chicago, was FANTASTIC! (Sorry can't remember his name right this second.)\n\nOur steaks, lobster, wine, side dishes were GREAT!  We were celebrating and they brought us a cute dessert with \"congratulations\" on the plate.  \n\nThe crowd was very young, urban and casually dressed. There were several people listening to their ear buds not talking to their dinner partners. I thought that was strange for a fine dinning experience.",
                                    "time": 1518003357
                                },
                                {
                                    "author_name": "lynn bell",
                                    "author_url": "https://www.google.com/maps/contrib/115836150962105609981/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-VxWGCXMNJbU/AAAAAAAAAAI/AAAAAAAAAAQ/cOZjYgCEEig/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "Where Do I Began, From Valet Service And Good Customer Service From Outside The Restaurant To Inside ,I Was Very Impressed. It Is By Far One Of The  Most Respected, Given The Most Feedback, And Most Favorites Of Many Friends And Family Of Mine.  Who Knew! Our Main Server ,Rick, Was A Delight He Knew The Menu On And Out And Helped Us Pick Some Great Choices. He Congratulated Our Engagement Celebration For Our Dinner Party And Also Threw In A Surprise For A Girlfriend Of Mine For Her Birthday Lighting Her Cake And Making Her Feel So Special On Her Day As Well. All The Servers Filled Our Empty Glasses , Took Care Of Me And My In- Laws Very Well.  I Highly Recommend And Will Be Back Soon! Thanks For Having Us! Two Success Celebrations In One! Great Staff As A Whole, Breathtaking ,Gorgeous Restaurant! Excellent Customer Service! We Were A Party Of 6,Accommodated Very Well~",
                                    "time": 1519565075
                                },
                                {
                                    "author_name": "Gary Sardon",
                                    "author_url": "https://www.google.com/maps/contrib/110260644006399917051/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-kTvyWozuPH8/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq061AH4udSg1MwQ0wOIlO55zXwLfg/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Love this place!  Wife and I go to a Ruth's Chris each year for our anniversary and it never disappoints. Best steaks and a great cocktail/wine list. Service is very attentive and great overall ambience.  I'd recommend that you valet as the garages are overpriced.",
                                    "time": 1524367098
                                },
                                {
                                    "author_name": "michael rankin",
                                    "author_url": "https://www.google.com/maps/contrib/101197277644397206134/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-2LgFNR-wYF4/AAAAAAAAAAI/AAAAAAAAAMo/75hB_FTE2DQ/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "It was, our 48rh wedding anniversary and,the staff made it very special for us!! The food was cooked perfect and was delicious. ...can't wait to get to the left overs!lol .\nPricey but I got what I paid for, highly recommended",
                                    "time": 1528977145
                                },
                                {
                                    "author_name": "Felicia Dodd",
                                    "author_url": "https://www.google.com/maps/contrib/107493176145672406199/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-Bp3OOmG3pOA/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0RtOIo4klf-h46TVvu4WoRvtwMXQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "14th Anniversary Dinner, party of 7 seated in Nicole's section. Great Service Very Friendly !!  Food Was Delicious.We Also Spent Some Time Speaking With Orlando , he was very friendly as well. Our Experience was definitely worth 5* .",
                                    "time": 1525646718
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXMK9scLaZdz71k1F0YmjfSLJxO2mBLlysPbV83hD97Q-QSQmPBUEmebtINZw6SHJwK3wQbXv02BXcFzE9NY2XIO69mSAoyF5PLYfsAi9LmvtBEyginEOAq9QLsyil-15EhBYwHsDtIdwaCSrHO-hb37AGhQPeP1Ip5-mKJk1nao3ATiteF-orw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-LDRbB0KCy2OWAiJD1hLjnTpidOgAs2joyRSjJoqBR7gfhu-FcOXTjC3Vo1ey_Iurvj81izgSgJ0tWn3Y2eu6gzIpQnZT9_qJXwUqo8kf2wzk5Vqs-f5kpbbcV2UweDZEhBWJMuGZtRRlzbF04Tqv-KkGhTq3hVvUVHpsNFyW7mMaSoN24pXyA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANe9xlsn1t7lMy0RVMesPIgzU3GHQgrDLTNXpSQ75YAl-W41OO9iTxymWEafWaBK2To4_HDJG5grbhlUB0idbC6jjqrZSJKmDbM5_tMGuZ7Yig9khXk3H1AsBmSbqd544EhCYZr9iCt3I1-yyRgeb8H-SGhSiWusFje0cRqxqFDWlD-bQedkyYQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAo_f1-CThgQmnOP3efJvJXTDBFbMIv8x042sli0xVeNnqSLbTKad0u5vNULirHWrqRLGVMgRjMR_h6_AQdCn1xI9hAfBdqL0YtPzxo8RVK3i8h494kWOaeD_QbHsj6mfoEhAHO00OCQkdIR1_Xr__mDzwGhSIkMvbCddsECwcAovZAcH03GHCNg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAACfVVDPn7JrKP79c_9I315DMHUiB4PjeWZmR4zakqWQiC-u_5XisqOLiOoiOCJ8o78XfRxjbu3Pfg2MG7SB0JzkjCFEbYw3Qtoe5dP67iFM7GcQT4dzpBkx2DoD8xuSqQEhArz3ucAIKekI3MVgnwVIOTGhRs9ArdtEpZHnod_f7JQ4MbKvw6rQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAACuSdEfpOs_YB6hXhn81kbyaiAsVFIA3DjIRC3ZFjvGrg2iAq24KI47hmJAH4oNqi_vSMQwXKc5rNXeUG0S8Ge8EBnEYwZFSOeRRwH9KhU3_mgOl8an_tz7S9zH4bOoJGEhAnYfV07ZXagDL2Ux41MpPjGhSjxLlr5P7UN5qPJiJWRhmgSyMU-A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAABHqnS7O2-ko_x_bOxfCZpaYMELtmJK8-IaZYCWj-pYDzoWzo7OhFAXT0ohRZ6vqfPT9-AkC-vBqVo87YOPVGf6DVU5MvuhhocMi-e7eJr_q_CWPw5vhysheyYL3Ixdb3EhA9fAVqfGhX9wAGEtrSpGmgGhQywYqUMxPCTFLh5Yzn3oXXfkuuEQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAx_EiYxX0IgA8tNItWkBTI5ofHGuk7wOpdqj44-TTqrGg1S4snCWPLDBuUaQdRkx7ZiztxNKTJWlGH70PE9f7g-TrI8QEaRIqVvT4PlRE84oGE_uLQ07pqpsX_9GTAc9JEhDqErH_H_15E81-T1UANTSkGhRGNoRGJJujiImawXNleuVm5hEHow&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYo775DXyV0XEQPPTJ54JRZlpoguvXSSsDT55TIhq5lYGlZcf-gQjU57PdVur0UTZcvBRLatKjqEYBT-qDLT22zp1LtMNphnI1mACQffcLcbuzMcYa1K1W6fdiCwCXb4eEhBtCMVuPKOVnkjb88nQLy-EGhRlWi6qgbmCqehzOZrr7x6Uy_GSbQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA6HB7PGjmdqvXOP9bq4f4mvoSgjWYicythOYutsus1AafQqc3X01ql9nH5GAML_BGPDHWV4P2SwdEFPcFtm0wuGTMANBm5cxjTgsKKReYt2Hn27bd04imiEQNVH58WjSpEhBuC_ZIkzVZIUirjuIjy6dcGhTMTd71ElHCj2VSpTz3ckQY0vfELg&maxwidth=400"
                            ],
                            "price": 4,
                            "rating": 4.5,
                            "category": "night",
                            "subcategory": "partybars",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50014470000001,-81.69222780000001&markers=color:0x82CA75|41.50014470000001,-81.69222780000001&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                }
            ],
            "date": "2018-09-07"
        },
        {
            "activities": [
                {
                    "date": "2018-09-08",
                    "name": "Duck - Rabbit Coffee",
                    "category": "food",
                    "timeframe": "breakfast",
                    "startTime": "09:00 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "id": "QXpNsm8A8G86Vu5ECo1MgA",
                    "phone": "",
                    "address": "2135 Columbus, Ste B, Cleveland, OH 44113",
                    "location": {
                        "lat": 41.48324,
                        "long": -81.70008
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.48324,-81.70008&markers=color:0x82CA75|41.48324,-81.70008&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "website": null,
                    "hours": {
                        "formattedHours": [
                            "Sunday, 07:00 am - 05:00 pm",
                            "Monday, 07:00 am - 05:00 pm",
                            "Tuesday, 07:00 am - 05:00 pm",
                            "Wednesday, 07:00 am - 05:00 pm",
                            "Thursday, 07:00 am - 05:00 pm",
                            "Friday, 07:00 am - 05:00 pm",
                            "Saturday, 07:00 am - 05:00 pm"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 0,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 0,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 1,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 1,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 2,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 2,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 3,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 3,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 4,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 4,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 5,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 5,
                                    "time": "0700"
                                }
                            },
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1700"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "0700"
                                }
                            }
                        ]
                    },
                    "photos": [
                        "https://s3-media2.fl.yelpcdn.com/bphoto/7sGGsktNVSMH6zVe1rPcjg/o.jpg",
                        "https://s3-media3.fl.yelpcdn.com/bphoto/9UkgM_bfFtT4VRVtOjO_5A/o.jpg",
                        "https://s3-media4.fl.yelpcdn.com/bphoto/2ATaT1KLUAS4YMwgl6Wuig/o.jpg"
                    ],
                    "price": 2.5,
                    "rating": 4.5,
                    "subcategory": "coffeeShops",
                    "backups": [
                        {
                            "date": "2018-09-08",
                            "name": "Passenger's Cafe",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "EtMPZAC63gcPSVj8N-dicg",
                            "phone": "(216) 394-0616",
                            "address": "2090 W 25th St, Cleveland, OH 44113",
                            "location": {
                                "lat": 41.4829347,
                                "long": -81.7025824
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4829347,-81.7025824&markers=color:0x82CA75|41.4829347,-81.7025824&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Sunday, 07:00 am - 06:00 pm",
                                    "Monday, 07:00 am - 06:00 pm",
                                    "Tuesday, 07:00 am - 06:00 pm",
                                    "Wednesday, 07:00 am - 06:00 pm",
                                    "Thursday, 07:00 am - 06:00 pm",
                                    "Friday, 08:00 am - 06:00 pm",
                                    "Saturday, 08:00 am - 04:00 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0700"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1800"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0800"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1600"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0800"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media2.fl.yelpcdn.com/bphoto/FaOW7FJcp6ayjl7jLD3pbA/o.jpg",
                                "https://s3-media2.fl.yelpcdn.com/bphoto/C9gI_T75TJHTgbY3xc-SgA/o.jpg",
                                "https://s3-media4.fl.yelpcdn.com/bphoto/dzFrWTWekFDWbcjLx81Uyw/o.jpg"
                            ],
                            "price": 1.25,
                            "rating": 4.5,
                            "category": "food",
                            "subcategory": "coffeeShops"
                        },
                        {
                            "date": "2018-09-08",
                            "name": "Joe Maxx Coffee",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "id": "WngnIN7vi2KYo4doqK51zA",
                            "phone": "(216) 459-7408",
                            "address": "2207 Chester Ave, Cleveland, OH 44114",
                            "location": {
                                "lat": 41.5039381596843,
                                "long": -81.6746669201611
                            },
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5039381596843,-81.6746669201611&markers=color:0x82CA75|41.5039381596843,-81.6746669201611&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                            "website": null,
                            "hours": {
                                "formattedHours": [
                                    "Sunday, 06:00 am - 10:00 pm",
                                    "Monday, 06:00 am - 10:00 pm",
                                    "Tuesday, 06:00 am - 10:00 pm",
                                    "Wednesday, 06:00 am - 10:00 pm",
                                    "Thursday, 06:00 am - 10:00 pm",
                                    "Friday, 06:00 am - 10:00 pm",
                                    "Saturday, 06:00 am - 10:00 pm"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "0600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "0600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "0600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "0600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "0600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "0600"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2200"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "0600"
                                        }
                                    }
                                ]
                            },
                            "photos": [
                                "https://s3-media4.fl.yelpcdn.com/bphoto/vEg85Q5jaeP8swGneJwGTw/o.jpg",
                                "https://s3-media2.fl.yelpcdn.com/bphoto/fSoTCY2wr3-MHddfCLqDuA/o.jpg"
                            ],
                            "price": 1.25,
                            "rating": 4.5,
                            "category": "food",
                            "subcategory": "coffeeShops"
                        }
                    ]
                },
                {
                    "date": "2018-09-08",
                    "name": "Baseball Heritage Museum",
                    "category": "day",
                    "startTime": "09:45 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "placeId": "ChIJL-9og7P7MIgRlrXDNTen9fo",
                    "phone": "(216) 789-1083",
                    "address": "6601 Lexington Ave, Cleveland, OH 44103, USA",
                    "location": {
                        "lat": 41.5111764,
                        "long": -81.6443127
                    },
                    "website": "http://baseballheritagemuseum.org/",
                    "hours": {
                        "formattedHours": [
                            "Monday: Closed",
                            "Tuesday: Closed",
                            "Wednesday: Closed",
                            "Thursday: Closed",
                            "Friday: Closed",
                            "Saturday: 10:00 AM – 3:00 PM",
                            "Sunday: Closed"
                        ],
                        "individualDaysData": [
                            {
                                "close": {
                                    "day": 6,
                                    "time": "1500"
                                },
                                "open": {
                                    "day": 6,
                                    "time": "1000"
                                }
                            }
                        ]
                    },
                    "reviews": [
                        {
                            "author_name": "Tim Borkowski",
                            "author_url": "https://www.google.com/maps/contrib/110377515935204784623/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-8flnvtPX5pI/AAAAAAAAAAI/AAAAAAAAvWM/yBBtVSMR72E/s128-c0x00000000-cc-rp-mo-ba6/photo.jpg",
                            "rating": 4,
                            "relative_time_description": "a month ago",
                            "text": "Really cool place. A part of Cleveland history and Baseball memorabilia that can't be found anywhere else.",
                            "time": 1524788458
                        },
                        {
                            "author_name": "Kris Lennon",
                            "author_url": "https://www.google.com/maps/contrib/115615057275513534970/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh6.googleusercontent.com/-qHzkOx1LwKY/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq3cUNjMAmUIw3orMgdQH7-zClG0YQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "5 months ago",
                            "text": "A great place to visit and also to be a volunteer and meet cool people",
                            "time": 1515729126
                        },
                        {
                            "author_name": "George Zehnder",
                            "author_url": "https://www.google.com/maps/contrib/105158013842522767453/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh5.googleusercontent.com/-yF1fA5MqPB8/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0DqLslycTb-FZcWv_Kb098RLmKiw/s128-c0x00000000-cc-rp-mo/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "8 months ago",
                            "text": "Excellent very interesting!!!!  Get over the area",
                            "time": 1506191517
                        },
                        {
                            "author_name": "Mandel Cox Jr.",
                            "author_url": "https://www.google.com/maps/contrib/102129273693684336179/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh4.googleusercontent.com/-w3_FO6gOlqE/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2YOcACeCyTACH-IBsC1wJc-PpI_w/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a year ago",
                            "text": "Landmark Baseball Park. Home of Cleveland Indians and Negroe Leaque Buckeyes in the 1930s.\n\n",
                            "time": 1486075897
                        },
                        {
                            "author_name": "Denise Kennedy",
                            "author_url": "https://www.google.com/maps/contrib/113538038704566289323/reviews",
                            "language": "en",
                            "profile_photo_url": "https://lh3.googleusercontent.com/-OoRhIUzP7TQ/AAAAAAAAAAI/AAAAAAAAA4w/GsDWeqpPO7g/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
                            "rating": 5,
                            "relative_time_description": "a year ago",
                            "text": "never been before but the opening was great its nice to have a baseball field and see baseball without baseball prices",
                            "time": 1477946989
                        }
                    ],
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmCoWmKW-DW4DjPoWV2lNofAtQNrGAIrakcaReXbFGmm1ZadPnzIq3mqaFPy8Ej6rubTptRN998B4oYY3RtziFNGhJik22meVNEhFH5muyZbW4qhyvsqf6ZXr8fE3zUg8EhAj-MbBy7zsX_h_yXXySAFIGhSK-U07uv09lvKyRcWAAhxFL3H6nA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAf51gD9x_sIIAoWooCLWkuRdeVnRcITQwFQWFvzp6h_foHsfMQ6UR25iI7z9GFihS6FhjCbZj0bCDoCRrrwrU_izdwf_EU-_oD03kinX1PkkAtTF7qqu7yMlRI3KHt-CCEhATasAIz0GpMkXHT8fsOa1MGhRhkhnF82F-KMPk022n93Zc1luGYg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAzlAHI_Au02p4Tgp1McwawU4s27YghET1rQQHv7Z0vMnuqCl2CyCw4PnAbGULBhY8QzzEZzxkWEVDNvWJmFMvBJHiD7quRyliXQFFomb_5nUJB-YpSUUXmrb1EDnqMLE_EhBCX590KoUxB0zycgG8yixdGhTU7RcJvG8O_QawXQyOlWtWMj68PQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAsq241Sdr9tYjpvU2w2lRyzLQx8_ij9mWv-OPM71G5rfnWiHRhJpApXhgsgKctPnDfrm-774F0okdQ-GlTzYxFDI4S7xtxVXV8LJckAusJuNEtUhx57wSLR3n9O59DDd_EhA1bt-163ybUPWAn0DC_rxnGhRbNb-0zobwShJlAh_lSDXxqKxkvQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAfFyxtUSMYkZFb_WF2t1gvyuhI1UYTtHPUsd2zw9F9R-kvmT0JKOLKF2kLq4nUpHCLxFxMDQAhnNYyuGg91w7jH8oOVJWID_MFp303S-EqwDl5vuX6W_7ON67cWmFB7JrEhCSgIDmRlxCrtCaJD3lYd8AGhS4U3rGW1JhvnOwWoK1WhHzWHHOpg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcfrvug67sePzJKnYMSR2Vj6K9CMy_AQ0dNN7avMZNQht62bpYOVFLw936-TsqKQwFLBYZY_kk8ir3aJIJDYMmV2zQZnY5L1Rq8xMPfvI-sxLk-aL4KOrk5Da7gJZeHwXEhCnz0lwRNMsTV-h67zS5AL6GhS6LtezTI3VgD6ba_SiKRUn-SGlew&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9o2p9S_K8MivGHgZHjKRGq86_-W0tsKvBpkMhFrTMUwC_uKiJkEmQ1AqPu34X4dMSf7XfkQWRDnr22Wy-nHghdM7cUaQ-Hv2KKh5JYchyeW8DXwD90tBu_lhn6yXZO7kEhBjY8XgBAfh33GSjmkDXivgGhTaYu7_3m-WZ0a75NonajH-HFpIRA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-TkdnAWipzVyDFoOmiw3taSg8u8vn5bHG5jLLctnLKRPin2LN-lFI8I91W6hIo6rxS1cu6jMelBIEPO0uQW0BiiiyDO5poFUzjBQWv5gacBxQ8Ml8p62mvfdSVwWI0ujEhBJ7ssCgsQNlC01J_PJ8Uk3GhRgEIR_gF0LvBI_fwL9G-MkOUNsjA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5l49CjU6AqaDk0mgRz6-1NwUzPkipcMvUZ9Xy1cA7pnIpnnY1vyzf6tkTUeTvwVFC7uYchU6Oii0DSkp9FitVgwyM3LeIGg4m2SoC1LZyN9Rac2hUDd5vwiaZGUkbylJEhCNuBkHdqngGGOKTOFX7PELGhTWAYgUvenHcPIHhUCviRrLGsJnug&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAzrFUYvcYMv9cgOZA3OQLawK3WYC_aN4ij-fgYTMyMRH_H5h9TpvbApHVV3fzghTUkRycqSU1drowP9FH1jJ7bDCGvzu7PyLdAHQqBGFiGGpH0raM5cnfGU3C2M58U77lEhBnJ9QNz7vNaPZX5IqOEr9SGhSwtFezJLot2PSDWcop1UeAfq2XHA&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "subcategory": "museums",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5111764,-81.6443127&markers=color:0x82CA75|41.5111764,-81.6443127&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "backups": [
                        {
                            "date": "2018-09-08",
                            "name": "Cleveland Museum of Art",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJ2Ql60437MIgRajTzalRnRgI",
                            "phone": "(877) 262-4748",
                            "address": "11150 East Blvd, Cleveland, OH 44106, USA",
                            "location": {
                                "lat": 41.50891699999999,
                                "long": -81.6116136
                            },
                            "website": "http://www.clevelandart.org/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: Closed",
                                    "Tuesday: 10:00 AM – 5:00 PM",
                                    "Wednesday: 10:00 AM – 9:00 PM",
                                    "Thursday: 10:00 AM – 5:00 PM",
                                    "Friday: 10:00 AM – 9:00 PM",
                                    "Saturday: 10:00 AM – 5:00 PM",
                                    "Sunday: 10:00 AM – 5:00 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2100"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "2100"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "1700"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1000"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "anthony giordano",
                                    "author_url": "https://www.google.com/maps/contrib/111072019712264459129/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-gZ-9RzmW9jA/AAAAAAAAAAI/AAAAAAAAF0Y/ly1_iVRFPxU/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "4 weeks ago",
                                    "text": "Visited while they had a special exhibit from Italy viewing. Just wonderful. Amazing place, and makes you so thankful for culture , art, beauty. Just breathtaking to see the huge paintings during the period wherein they first started trying to capture historic events in huge paintings. Just so impressive, could spend weeks at this exhibit alone. I might add, extremely thankful, as a Vietnam Vet, for free entrance by so many Ohio museums. What a difference a handful of decades makes ! Very appreciative ! Thank you.",
                                    "time": 1526526085
                                },
                                {
                                    "author_name": "ashley cox",
                                    "author_url": "https://www.google.com/maps/contrib/111512279604931390864/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-7o6dglIDucA/AAAAAAAAAAI/AAAAAAAAARM/_0_LYIPm70A/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "Amazing! The staff was very friendly and helpful. Has no problem getting information and directions. The space is beautiful. Each of the rooms flow very nicely into the next. There was quite a bit of people (taking prom pictures) making noise in the lobby/ atrium areas, but it was quiet in the exhibition areas. A very relaxing but still fun experience. I definitely recommend going. Parking was $11.00 but admission was free this past Saturday.",
                                    "time": 1526219925
                                },
                                {
                                    "author_name": "Jeff and Connie",
                                    "author_url": "https://www.google.com/maps/contrib/107133287732978335186/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh3.googleusercontent.com/-IqeLkaEbEEY/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2qfyO-ZU0G1_wFh1rZozitpRGCvQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "in the last week",
                                    "text": "Awesome!!! Impressive displays with informative literature. Helpful, friendly staff who are passionate about this incredible museum. Even the cafe served gourmet food at affordable prices. If you visit Cleveland, this is a \"must see\" attraction!",
                                    "time": 1528464160
                                },
                                {
                                    "author_name": "Nick Gallagher",
                                    "author_url": "https://www.google.com/maps/contrib/114627490916611187068/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-TVy7lkoFZWk/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1IMgYOdrG0AG1M-BkPDI7kJBf_uQ/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a month ago",
                                    "text": "FANTASTIC!!  The Cleveland Museum of Art has a reputation for being one of the best in the country.  That reputation is well-deserved.  Exhibits are well placed and we'll thought out.  If one goes during the week, it's not crowded.  There is no free for admission to look at the collection.  Although parking used to be free, now all parking requires feeding the meter.",
                                    "time": 1525539428
                                },
                                {
                                    "author_name": "Jalincoblentz Coblentz",
                                    "author_url": "https://www.google.com/maps/contrib/114377350271188070665/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-f87M0rvyKCg/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq0izMB-rveLxsdHKI2lmEMfvG5bGg/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 weeks ago",
                                    "text": "Absolutely amazing place to visit in Cleveland, and the best part? It's free! My wife and I went thinking that we would be done in a couple of hours but it was so great and there was so much to see that we are planning to go back for another full day. Absolutely loved it and I'm not even an art person.",
                                    "time": 1526890192
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9xDLNZqGkzO5KjmuvP8HJbeNIaqI2GBHwvpB63xW9sHqvtmc1OWIkF4VImMOw2V30Tb5Bw3bmpZRSvAl6m0BJw9ZcUetNYxNwCTW6BtTcD-yTpopq1a57tcHgVbhynkSEhBpg5diPD5gJwjXP9wXDdV-GhR-bzhEmGEFhzfEtAZI4_QWzxc2IA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmcujC7N-2muVAI1tJwLtALc_zQ9XApqQ2cgAU5NoTSFQLPj2GZgxfCIFdble2Pu-8KxdgSkIRVX6SHLyLyIURXka7ZvCDMfdL-10PRTVLjOifTD9MwR_gtkGR0a8eyg2EhBMz_A0uAtamzcoHAiEXNylGhQNkQ-nHPq4WDz_aD-cADMtYoaMSw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEaD6lHC4G8yEukyojE1LWPmP40sE7AXP9TKcN0jfFhgzrzLh7YcOLDUbPCO7JUcZaNsZc1JoerAkdYTf42n_i8rZ0gQZ3dYNpRBUWDnhTak6GBnWHrFv_wpV4kzP805YEhD4GPfdLWlLYiwKzs4SARiCGhTynL4IcOoAqHIJm2VE8ueymeU3Cg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEkLc8pGRDVU4QaY_AN7EC7Yv95-rIfls-2-xyG2lMRAgT9uFTkPN7TQcWrXJMp-zPwwaYItl4nGQww09pkZhlkHQYAi49c0SXeEEy5fpCWOfVPH8JW5NeKI5HEGa69cvEhDjYHn_ftPpg9FgckO3dWwzGhRgmmGQQmXEts8AaxzrUhmIqpjj3A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA41OXwy3NkUR5M4qBBd8dBXLhwErYRvYM4nRUXUzSRkLR_8QwCHNPOqWmnQKwh7IJBplWiEaA1b77Dcr1oH2vH64xz22NfU6S4SF2QtZLgvJyyYBDE0sSMW9s1uut1iPcEhClU_GG85oZKK4VoZwVASFTGhQydKovsv1Jv8XkH7GAeQpvqYbrCA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARiXshjXQtwZFekYWIJwDmtlMWtHkfIu5xkxhQ5VUujFEFtdWT0Lb6OnbHbrfo5YO6nuWzuFi1-4myquf1-KU2luuLURmyZTo5VpL_o8ZQS518000upWqd-jlg5Ak8SsvEhBNQ0-fasX7Fp4QvMJozOJMGhRX0g5cN03I7FwVUTce4ubiZMI8JA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJnPGIV_XWbIiah-lixVi48UzxPPK5VoMMd-isdG4Ajn3f_x5V8K4sV1tyG32DLWhY7SDSbn0Yz_wB2VdBETeA6S06C-71lRuZdNjZk9dztUYZSUzR2gjHGazk1tPijJPEhC8OiwfAQILjilN2FwYzqNQGhSjg6KulftRXtDyiYsEwnLOAzQ_4A&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAaNTgFwkt9o4cN3sZ67CWj7sT_W2zlCyKcP0bnUwx8TVKJZgaN0qoV5TVwy58d0omRWtBi9De1IlZADAo8SjGsX9ERjC_Om5WEE96Ia8TINx8Nh4iCpxufj4v1sXP40aoEhCiP3KWvzrLjowQohbZe41uGhRZ_7RnBya7mhmyh4oQ4tR3d1MiJg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAM2QBa1Z621LvIWCPZaVCmuooqF4VVcN2onL8uNDs3QSz9KqBCA-BdeLfWRIkjD3QkmRnqxu55UZKlQj0dFXv-Lsw9fc6_UeIF8YlJfLVmcvpH2APVkglsK37T2sXv1CZEhCgXfVggWH9zI-Fb4CCG5tGGhROTdgppSP_2IGcKBfWRZWoVBQEDQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApjbnsIFceR9zRoUCRKoH501-T0S2ZET6NOQ3R6DQXTvkhtCGpHc530fuc1ejp6nwYMWasOPQWWSdIyM7QFxPTojYnr9HCY9UTXBtCnGEfCHI7jJh32fhkQpaEG8RgbHHEhBmlVH9huAgRzItgjHWU7XuGhR8wTHMGgcQg7mdP2sdCPNMdfsJrg&maxwidth=400"
                            ],
                            "rating": 4.9,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50891699999999,-81.6116136&markers=color:0x82CA75|41.50891699999999,-81.6116136&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        },
                        {
                            "date": "2018-09-08",
                            "name": "Rock & Roll Hall of Fame",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                            "placeId": "ChIJHZLHDYPwMIgRXxZaKR6dG5c",
                            "phone": "(216) 781-7625",
                            "address": "1100 E 9th St, Cleveland, OH 44114, USA",
                            "location": {
                                "lat": 41.5085414,
                                "long": -81.6953685
                            },
                            "website": "http://www.rockhall.com/",
                            "hours": {
                                "formattedHours": [
                                    "Monday: 10:00 AM – 5:30 PM",
                                    "Tuesday: 10:00 AM – 5:30 PM",
                                    "Wednesday: 10:00 AM – 9:00 PM",
                                    "Thursday: 10:00 AM – 5:30 PM",
                                    "Friday: 10:00 AM – 5:30 PM",
                                    "Saturday: 10:00 AM – 9:00 PM",
                                    "Sunday: 10:00 AM – 5:30 PM"
                                ],
                                "individualDaysData": [
                                    {
                                        "close": {
                                            "day": 0,
                                            "time": "1730"
                                        },
                                        "open": {
                                            "day": 0,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 1,
                                            "time": "1730"
                                        },
                                        "open": {
                                            "day": 1,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 2,
                                            "time": "1730"
                                        },
                                        "open": {
                                            "day": 2,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 3,
                                            "time": "2100"
                                        },
                                        "open": {
                                            "day": 3,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 4,
                                            "time": "1730"
                                        },
                                        "open": {
                                            "day": 4,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 5,
                                            "time": "1730"
                                        },
                                        "open": {
                                            "day": 5,
                                            "time": "1000"
                                        }
                                    },
                                    {
                                        "close": {
                                            "day": 6,
                                            "time": "2100"
                                        },
                                        "open": {
                                            "day": 6,
                                            "time": "1000"
                                        }
                                    }
                                ]
                            },
                            "reviews": [
                                {
                                    "author_name": "Tim Brownell",
                                    "author_url": "https://www.google.com/maps/contrib/110367522255192842002/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh6.googleusercontent.com/-t52llr4QZtc/AAAAAAAAAAI/AAAAAAAAAYc/BctQaB1L3IQ/s128-c0x00000000-cc-rp-mo/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "4 weeks ago",
                                    "text": "Good, but not great.  It was awesome to see so much cool memorabilia, but to be honest they could have done a LOT more with it.  There was a lot of stuff from artists that aren't even inducted.  If you've ever been to a Hard Rock Cafe then think of it like that.  Large cases and displays with small plaques giving you some detail and maybe a story on the item.  Cool to see so much rock history, but to be honest I was expecting a bit more.",
                                    "time": 1526470054
                                },
                                {
                                    "author_name": "Taylor TK",
                                    "author_url": "https://www.google.com/maps/contrib/105807241243837936860/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-Vvox1KXuIck/AAAAAAAAAAI/AAAAAAAAAnc/T64UECRHu2M/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "3 months ago",
                                    "text": "I enjoyed this place quite a lot. I enjoyed seeing the history behind rock and roll. There was a lot to look at and some of the artifacts were really cool to see. There were also videos as well as music accompanying some exhibits which I found enriched the experience. There were a lot of places to sit down. The building itself was interesting too, a lot of floors with escalator + elevator access with different exhibits to explore. The short 12 minute film that played in the theatre was a bit loud (which apparently means I'm too old according to one of the shirts in the gift shop) but it was probably one of my favourite parts of this place. The food in the cafe was good too. I would want to go back in a few years to see how it changes with new inductees.",
                                    "time": 1520970379
                                },
                                {
                                    "author_name": "Harrilyn Arnold",
                                    "author_url": "https://www.google.com/maps/contrib/117292908867641908871/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh4.googleusercontent.com/-07UJkqMY00c/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2mrNTOlSQ_Xl78Lj0ncixZncR1bQ/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "Always a pleasure to visit RRHOF! If you love music then you gotta visit this place at least once a year! Nice renovations have been made making it even cooler than before! Gift shop has nice but pricey items - many school-aged kids cannot afford souvenirs. Adults scoff at the prices. Overall worth the trip.",
                                    "time": 1528078818
                                },
                                {
                                    "author_name": "Kelsey C",
                                    "author_url": "https://www.google.com/maps/contrib/107502449263949254455/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/--Iyor7UCjLU/AAAAAAAAAAI/AAAAAAAAANw/vSKOVAeHQUw/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 5,
                                    "relative_time_description": "a week ago",
                                    "text": "Awesome! So informative and has a great selection of collectibles. I went around 6 pm on Wednesday because of their later hours and it wasn't overly crowded that you couldn't enjoy yourself. I suggest trying out the Rock and Roll Hall of Fame theater room where you can experience the show for yourself! Flash photography is allowed as well if you're into that and parking out front is free after 6 so that was a plus.",
                                    "time": 1528221453
                                },
                                {
                                    "author_name": "Scott Riffle",
                                    "author_url": "https://www.google.com/maps/contrib/100790238408609757075/reviews",
                                    "language": "en",
                                    "profile_photo_url": "https://lh5.googleusercontent.com/-B5xUoc_GA1Q/AAAAAAAAAAI/AAAAAAAAFQg/kDEL_CU4tUc/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
                                    "rating": 4,
                                    "relative_time_description": "a week ago",
                                    "text": "The concept seems to be better than the actual experience. A self guided tour for $20? I think the venue can and should do more to draw visitors. I'm happy to see that they give homage to the man who coined the phrase \"Rock and Roll\" and who had the guts to play and promote it.",
                                    "time": 1527990742
                                }
                            ],
                            "photos": [
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAACTWJKrr5wPS1eDOJqGWw5sdTHPWJUhl0P6NlnDiKqLL_vQea-CaAXjWyzQPV0NsKDZKGf9U7gdl50RlMkWQ4fe6DRq0Hya-QfhGBMTCQv49pE0y5VOV_1r-3KS8hnF-XEhAdPy7Tno1w-WkJzrUKtDoWGhRdjjhwrY2X7bMgvpcKiXIyplLN4g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAS3kbFVMkor-uKvkwpU4_giUvxKJ1fOhNVEXig4U-E73n6pE2MSl1CF_1tH5J73YPfFXkgn_5sM-R4xeiUPuFswvrqqDQz-_Gr0YTPn5g321tmkbrOg7a0VatD_1iYI6EhCZj-6ymGmuuWG8vTmMfK5EGhSFXOP4icuG_P1qBqOrR5nLxXDVwg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAien-ApZ69OwEG5WdvHTsET1XghPH_FkBtHnJSsjbrdWIsI2ZGZpEcvBlvJRQ8ArdvWaD--NAK6kDdN_tE1gkct7hO7C7wc5I1tefuM9P8JmxDLQ5w2eQm709v0H1BhF5EhBvmUD_-NkErMi4Cnv5h-1SGhSP-UCJi2AYKkwbVhxmgP11_6yfoA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAV8okpNlgeB_pkRG6x_IZneaqkaz8lVm3B3-8mHkVZbEYAibzdmLzc13DZeMfzGcDtElIcaHdBXp6LG0ljnnK8eErTAmcPNdRCdDt6PF5WlmX3YW9sHwHPdHQdMI3q2pqEhCA_GyIw1WFPLLbXXEmRmXsGhRl61ZZZGSlYRW6JN1fU4DkbKimwQ&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQpbNMywPwksJiBQul-pyv1Rvf1wfxPCcV24l6he2bq-8KhdbV7amUwANz2fENneNRXOzuS9xRMswu2NZTuBwtx715M7w611HeCGecY_uaUy6XwZ46smWVj1HQa6iD54OEhD-CUu3-m6P4ub0l4xWLrDOGhTvf2gdeReRwYsp5NEufVfj5P61OA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA8xOsWIWP-MPk-9A-aTX9bnyyaNsmF6cbPn1Tzi52RnR8nlrjahrDrdf06N4uTmzbbsrbiYeAj74ZZ8AWv2vS0poquWoUFAPEzUYXfOrov_kCoBLYaSUkDsmHqsL_TvtpEhA8bksP4aNC24XE3BQ7Jbv6GhS3seN-8cVNoQJZulf5bu-jGpDd_g&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATjgnQHwiHafkIFvvG1mJ18a-wE0jbizXvSj8KNxPPdRl6cJyOCvNUbrrozZhS8XdOXBOHwk1oXOV6b75_cnqrD_v8TBbF2HYaPP9PwQi_usD8D4CbSRyBEJ2w-2Uwv2oEhDq4KF8uI19sdrSMc-U2ADgGhROjXYVyRTeBQTQYyRt-y6Si6j2lA&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApa0HR8f2Pi8Xc_W7m49ucK7JaNNTJ6lca3UmnwElNWSOOAu2a2yfaHQMW5kIYMVE6LhOlb3nQvywgU6xfmLnEvTmw90UG8_Atqdk28eQJ0rgWJfMlGJCvSL5RogIfLZkEhDM2u36kIrhcStVtYo-RYTNGhT84qvO8q7DxtROs-Q1FkuY03SlWw&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAwW1p327lHj-1QuL10s_7IBh18XXDc3noul-ZARSyJ_WbrNv9Vcy2gQmXWWyzHQNOnF_7LUofKsIigRFBTOEHY9mdf5U3X-2Ah7wj4YvkQVl1Mo9OkKYqf2RjimYOLb0-EhC701GUEdIpiCEpsXWfRNt6GhQ47UbiUXfUK6AXWtK1HN_-xhRoNg&maxwidth=400",
                                "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7ickvO7N4SPCJJu-xKofeCBOjmPXYFWyu9K18LRH2vaX26OC1WNvNrkX_XTWad_SXz4Nhk_-DkWFU1BC6iMU0ZXAmIcukZ7B3XjGS3USoAUPNDcRjxcIJpW0t4P1QcZQEhC09dy2ixnn5YsmS1mpWLl1GhRBgiwLXo7EreDrVC4U87xOgaDiQg&maxwidth=400"
                            ],
                            "rating": 4.5,
                            "category": "day",
                            "subcategory": "museums",
                            "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5085414,-81.6953685&markers=color:0x82CA75|41.5085414,-81.6953685&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                        }
                    ]
                }
            ],
            "date": "2018-09-08"
        }
    ],
    "preferencesUsed": {
        "lat": 38.0487,
        "long": -84.5023,
        "preferences": {
            "dayActivities": [
                "museums",
                "famousSights",
                "activeTourism"
            ],
            "nightActivities": [
                "partybars",
                "sportsbars",
                "danceHalls"
            ],
            "food": [
                "fastFood",
                "coffeeShops",
                "upscale"
            ]
        },
        "arrivalTime": "2018-09-05T13:00:00.000Z",
        "departureTime": "2018-09-07T15:00:00.000Z",
        "gameId": "vv17FZ4aGkBiScYD",
        "radius": "1.5"
    }
}

const RETURNTEST = true

module.exports = {
    createTrip: (data) => {
        return new Promise(async(resolve, reject) => {
            // For testing purposes
            if(RETURNTEST){
                return resolve(exampleTrip)
            }

            data.gameData = await getGameData('tm-game-' + data.gameId)
            //@TODO: Make sure you use the radius passed in
            data.radius = "1.5"

            let tripStub = TripStubHelper.createTripStub(data)
            
            console.log("got the trip stub")
            let required = helpers.getRequiredBusinessesFromTripStub(tripStub)

            // Get a list of businesses that we can filter and sort
            // through before getting more details
            let businessData = await getListOfBusinessesFromProviders(data, required)
            console.log("got business data")

            let initialListOfBusinesses = []

            for (var i = 0; i < businessData.length; i++) {
                initialListOfBusinesses.push(...businessData[i])
            }

            // Remove duplicates
            initialListOfBusinesses = helpers.removeDuplicates(initialListOfBusinesses, 'id')
            initialListOfBusinesses = helpers.removeDuplicates(initialListOfBusinesses, 'name')
            // Sort by user preferences
            initialListOfBusinesses = sortByUserPreferenceAndRemoveBusinessesWithoutRequiredParameters(initialListOfBusinesses, data.preferences)


            let finalListOfBusinesses = getFinalListOfBusinessesFromTripStub(initialListOfBusinesses, required)

            getMoreDetails(finalListOfBusinesses).then(finalBusinessData => {
                let finalBusinesses = []
                for (var i = 0; i < finalBusinessData.length; i++) {
                    finalBusinesses.push(...finalBusinessData[i])
                }

                console.log("got the data with more details!!!")

                formatTripFromBusinesses(tripStub, finalBusinesses).then(trip => {
                    return resolve(trip)
                })
            })

        })
    }
}


/**
 * Fetches data from third party providers. Gets the initial list of businesses
 * that we are going to sort and use
 * @param  {Object} data     The data that was passed in from the front
 * @param  {Object} required The required number of businesses we need to get
 * for this trip
 * @return {Array}           An array of businesses to start sorting and looking through
 */
async function getListOfBusinessesFromProviders(data, required) {
    return new Promise(async(resolve, reject) => {
        let businesses = await Promise.all([
            GoogleHelper.findBusinesses(data, required),
            YelpHelper.findBusinesses(data, required)
        ])

        return resolve(businesses)
    })
}

function getMoreDetails(businesses) {
    return new Promise((resolve, reject) => {

        let data = {}
        for (var i = 0; i < businesses.length; i++) {
            if (!data[businesses[i].provider]) {
                data[businesses[i].provider] = []
            }
            data[businesses[i].provider].push(businesses[i])
        }

        Promise.all([
            GoogleHelper.getMoreDetails(data['google']),
            YelpHelper.getMoreDetails(data['yelp'])
        ]).then(businesses => {
            return resolve(businesses)
        })
    })
}

/**
 * Sorts by the user's preferences
 * @param  {Array}  businesses          The businesses to sort
 * @param  {Object} preferences         The user's preferences that they entered in the app
 * @return {Array}                      The sorted businesses
 */
function sortByUserPreferenceAndRemoveBusinessesWithoutRequiredParameters(businesses, preferences) {
    // For now, just sort by rating...
    businesses = businesses.sort(function(a, b) {
        return b.rating - a.rating
    });
    return businesses
}

/**
 * Fetches the game that the user is going to via the TicketMaster Event ID that they passed
 * up to the API. This function first checks to see if the game is stored in Redis. If it
 * is, then we return it from the cache. If not, we use the TicketMaster API to fetch the
 * game, then cache it for easy retrieval later.
 * @param  {String} tmGameKey The formatted TicketMaster key, which may or may not be
 * stored in Redis. 
 * @return {Object} The Event object from TicketMaster
 */
async function getGameData(tmGameKey) {
    let data
    return new Promise(async(resolve, reject) => {
        console.log("getting game data. Checking to see if it is in redis...")
        let cachedGameData = await redisHelper.get(tmGameKey)
        if (cachedGameData) {
            console.log("Game was in Redis")
            return resolve(cachedGameData)
        } else {
            console.log("have to fetch game from Ticketmaster")

            try{
                data = await TicketMasterHelper.getGameDetails(_.last(tmGameKey.split('-')))
            } catch(e) {
                console.log("error getting game: ", e)
                return
            }
            let startTime = moment(data.dates.start.dateTime).subtract(1, 'hour').toISOString()

            let gameData = {
                "name": data.name,
                "classification": data.classifications[0].subGenre.name + ' ' + data.classifications[0].genre.name,
                "id": data.id,
                "ticketUrL": data.url,
                "isTBA": data.dates.start.timeTBA,
                "startTime": startTime
            }

            let cacheGameResult = await redisHelper.set(tmGameKey, gameData)
            return resolve(gameData)
        }
    })
}

function formatTripFromBusinesses(tripStub, businesses) {
    return new Promise((resolve, reject) => {
        console.log("Got the details for the businesses...")
        console.log("Creating trip...")

        console.log("trip stub: ", tripStub)

        Object.keys(tripStub).forEach(day => getBusinessAndBackupOpenAtAvailableTime(day))

        console.log("done!")
        console.log("returning the trip")

        let tripResponse = {
            "itineraries": Object.keys(tripStub).map(tripStubKey => {
                return {
                    "activities": tripStub[tripStubKey],
                    "date": tripStubKey
                }
            })
        }

        return resolve(tripResponse)

        function getBusinessAndBackupOpenAtAvailableTime(day) {
            let foundBusinesses = []
            for (var i = 0; i < tripStub[day].length; i++) {
                let activity = tripStub[day][i]
                for (var j = 0; j < businesses.length; j++) {
                    let business = businesses[j]
                    for (var k = 0; k < business.hours.individualDaysData.length; k++) {
                        let businessDay = business.hours.individualDaysData[k]
                        if (_.findWhere(foundBusinesses, business) == null &&
                            business.subcategory === activity.name &&
                            businessDay.open.day === moment(day).day() &&
                            businessIsOpenOnTime(businessDay, day, activity)) {
                            foundBusinesses.push(business)
                            if (foundBusinesses.length >= 3) {
                                console.log("adding data to this: ", activity)
                                Object.keys(foundBusinesses[0]).forEach(key => {
                                    activity[key] = foundBusinesses[0][key]
                                })

                                activity.backups = [foundBusinesses[1], foundBusinesses[2]]

                                businesses = _(businesses).filter(function(b) {
                                    return !foundBusinesses.includes(b)
                                });
                                foundBusinesses = []
                            }
                        }
                    }
                }
            }
        }
    })

    function businessIsOpenOnTime(businessDay, day, activity) {
        if (!businessDay.open.time || !businessDay.close.time) return false

        console.log("day: ", day)
        let activityTime = moment(day + ' ' + activity.startTime)

        let businessOpenTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.open.time)))
        let businessCloseTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.close.time)))

        if (businessOpenTime.isSameOrBefore(activityTime)) return true
        if (businessCloseTime.isSameOrAfter(activityTime)) return true
        if (businessDay.close.day != businessDay.open.day) return true
        return false
    }
}

function getFinalListOfBusinessesFromTripStub(businesses, required) {
    let finalList = []

    businesses.forEach(b => {
        if (getNumberOfActivitiesThatMatchCategoryInArray(finalList, b.subcategory) < required[b.subcategory].count) {
            finalList.push(b)
        }
    })

    return finalList
}

function getNumberOfActivitiesThatMatchCategoryInArray(array, category) {
    if (!array.length) return 0

    let count = _.countBy(array, function(item) {
        return item.subcategory === category;
    });
    return count.true || 0
}