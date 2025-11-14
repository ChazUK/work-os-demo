<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Dashboard • {{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @else
            <style>
                /*! Minimal utility subset to align with welcome layout. For full styling, ensure Vite/Tailwind build is running. */
                body { font-family: 'Instrument Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; }
            </style>
        @endif
    </head>
    <body class="min-h-screen bg-slate-50 text-slate-900">
        <div class="min-h-screen flex flex-col">
            <header class="border-b border-slate-200 bg-white/80 backdrop-blur">
                <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-2">
                        <div class="h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold">
                            HC
                        </div>
                        <div>
                            <div class="text-sm font-semibold tracking-tight">HomeCert Direct</div>
                            <div class="text-xs text-slate-500">Housing compliance made simple</div>
                        </div>
                    </div>

                    <nav class="flex items-center gap-3 text-sm">
                        <a href="/" class="px-3 py-1.5 rounded border border-slate-200 text-slate-700 hover:bg-slate-50">
                            Marketing site
                        </a>
                        <span class="px-3 py-1.5 rounded bg-slate-900 text-white">
                            Dashboard
                        </span>
                    </nav>
                </div>
            </header>

            <main class="flex-1 bg-slate-50">
                <div class="max-w-5xl mx-auto px-6 py-8 space-y-6">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <h1 class="text-2xl font-semibold tracking-tight text-slate-900">Your certificates</h1>
                            <p class="text-sm text-slate-600 mt-1">Overview of your active and upcoming compliance across properties.</p>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-slate-500">
                            <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1">
                                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                All services operational
                            </span>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-[2fr,1.3fr] gap-6 items-start">
                        <section class="space-y-4">
                            <div class="flex items-center justify-between text-xs text-slate-500">
                                <div class="flex gap-3">
                                    <span><span class="inline-block h-2 w-2 rounded-full bg-emerald-500 mr-1"></span>Compliant</span>
                                    <span><span class="inline-block h-2 w-2 rounded-full bg-amber-500 mr-1"></span>Expiring soon</span>
                                    <span><span class="inline-block h-2 w-2 rounded-full bg-rose-500 mr-1"></span>Overdue</span>
                                </div>
                                <span>Sample data – hook this up to real certificates later.</span>
                            </div>

                            <div class="grid gap-4 md:grid-cols-2">
                                <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm flex flex-col gap-3">
                                    <div class="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 class="text-sm font-semibold text-slate-900">EPC • 24A High Street</h2>
                                            <p class="text-xs text-slate-500">Property ID: HS-24A</p>
                                        </div>
                                        <span class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-100">
                                            Compliant
                                        </span>
                                    </div>
                                    <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-600">
                                        <div>
                                            <dt class="text-slate-500">Certificate no.</dt>
                                            <dd class="font-medium text-slate-900">EPC-938201</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Expiry</dt>
                                            <dd class="font-medium text-slate-900">12 Mar 2030</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Assessor</dt>
                                            <dd class="text-slate-800">Sarah Johnson</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Last updated</dt>
                                            <dd>12 Mar 2020</dd>
                                        </div>
                                    </dl>
                                    <div class="flex justify-between items-center mt-2 text-[11px] text-slate-500">
                                        <button class="inline-flex items-center px-2 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-50">
                                            View PDF
                                        </button>
                                        <span>Reminder set 30 days before expiry</span>
                                    </div>
                                </article>

                                <article class="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm flex flex-col gap-3">
                                    <div class="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 class="text-sm font-semibold text-slate-900">Gas Safety • 12B Market Road</h2>
                                            <p class="text-xs text-slate-600">Property ID: MR-12B</p>
                                        </div>
                                        <span class="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-700 border border-amber-300">
                                            Expires in 14 days
                                        </span>
                                    </div>
                                    <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-700">
                                        <div>
                                            <dt class="text-slate-500">Certificate no.</dt>
                                            <dd class="font-medium text-slate-900">GAS-442110</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Expiry</dt>
                                            <dd class="font-medium text-slate-900">28 Nov 2025</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Assessor</dt>
                                            <dd class="text-slate-800">James Lee</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Next action</dt>
                                            <dd>Rebook appointment</dd>
                                        </div>
                                    </dl>
                                    <div class="flex justify-between items-center mt-2 text-[11px]">
                                        <button class="inline-flex items-center px-2 py-1 rounded bg-slate-900 text-white hover:bg-slate-800">
                                            Book renewal
                                        </button>
                                        <span class="text-slate-600">Reminder sent yesterday</span>
                                    </div>
                                </article>

                                <article class="rounded-lg border border-rose-200 bg-rose-50 p-4 shadow-sm flex flex-col gap-3">
                                    <div class="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 class="text-sm font-semibold text-slate-900">EICR • 5 Orchard Close</h2>
                                            <p class="text-xs text-slate-600">Property ID: OC-5</p>
                                        </div>
                                        <span class="inline-flex items-center rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-700 border border-rose-300">
                                            Overdue
                                        </span>
                                    </div>
                                    <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-700">
                                        <div>
                                            <dt class="text-slate-500">Last inspection</dt>
                                            <dd class="font-medium text-slate-900">03 Sep 2019</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Recommended by</dt>
                                            <dd class="text-slate-800">Regulation 3</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Risk</dt>
                                            <dd class="text-rose-700 font-medium">High – book immediately</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Property status</dt>
                                            <dd>Occupied</dd>
                                        </div>
                                    </dl>
                                    <div class="flex justify-between items-center mt-2 text-[11px]">
                                        <button class="inline-flex items-center px-2 py-1 rounded bg-rose-600 text-white hover:bg-rose-700">
                                            Book urgent visit
                                        </button>
                                        <span class="text-slate-600">3 alerts raised</span>
                                    </div>
                                </article>

                                <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm flex flex-col gap-3">
                                    <div class="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 class="text-sm font-semibold text-slate-900">Legionella • 18 Riverside Court</h2>
                                            <p class="text-xs text-slate-500">Property ID: RC-18</p>
                                        </div>
                                        <span class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-100">
                                            Scheduled
                                        </span>
                                    </div>
                                    <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-700">
                                        <div>
                                            <dt class="text-slate-500">Appointment</dt>
                                            <dd class="font-medium text-slate-900">22 Nov 2025, 10:15</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Engineer</dt>
                                            <dd class="text-slate-800">Alex Patel</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Access notes</dt>
                                            <dd>Keys with agent, parking on street.</dd>
                                        </div>
                                        <div>
                                            <dt class="text-slate-500">Reminder</dt>
                                            <dd>Tenant SMS 24h before</dd>
                                        </div>
                                    </dl>
                                    <div class="flex justify-end items-center mt-2 text-[11px] text-slate-600">
                                        <span>Next reminder: 21 Nov, 10:15</span>
                                    </div>
                                </article>
                            </div>
                        </section>

                        <aside class="space-y-4">
                            <section class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                                <div class="flex items-center justify-between mb-3">
                                    <h2 class="text-sm font-semibold text-slate-900">Alerts</h2>
                                    <span class="text-[11px] text-slate-500">2 open</span>
                                </div>
                                <ul class="space-y-2 text-xs text-slate-700">
                                    <li class="flex items-start gap-2">
                                        <span class="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                                        <div>
                                            <p class="font-medium text-slate-900">EICR overdue at 5 Orchard Close</p>
                                            <p class="text-slate-600">Tenancy renewal due next month. Ensure certificate is in place before signing.</p>
                                            <p class="text-[11px] text-slate-400 mt-1">Raised 3 days ago • Assigned to you</p>
                                        </div>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                        <div>
                                            <p class="font-medium text-slate-900">Gas safety expiring at 12B Market Road</p>
                                            <p class="text-slate-600">Last appointment availability this week is Thursday 2–5pm.</p>
                                            <p class="text-[11px] text-slate-400 mt-1">Raised today • Not yet booked</p>
                                        </div>
                                    </li>
                                </ul>
                            </section>

                            <section class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                                <div class="flex items-center justify-between mb-3">
                                    <h2 class="text-sm font-semibold text-slate-900">Reminders</h2>
                                    <button class="text-[11px] text-emerald-700 hover:underline">Manage rules</button>
                                </div>
                                <ul class="space-y-2 text-xs text-slate-700">
                                    <li class="flex items-start justify-between gap-2">
                                        <div>
                                            <p class="font-medium text-slate-900">Portfolio review</p>
                                            <p class="text-slate-600">Check certificates expiring in the next 90 days.</p>
                                            <p class="text-[11px] text-slate-400 mt-1">Repeats monthly • Next on 01 Dec 2025</p>
                                        </div>
                                    </li>
                                    <li class="flex items-start justify-between gap-2">
                                        <div>
                                            <p class="font-medium text-slate-900">Agent report export</p>
                                            <p class="text-slate-600">Download CSV of all certificates for your records.</p>
                                            <p class="text-[11px] text-slate-400 mt-1">Repeats quarterly • Next on 01 Jan 2026</p>
                                        </div>
                                    </li>
                                    <li class="flex items-start justify-between gap-2">
                                        <div>
                                            <p class="font-medium text-slate-900">Tenant communications</p>
                                            <p class="text-slate-600">Review reminder templates for SMS and email.</p>
                                            <p class="text-[11px] text-slate-400 mt-1">Ad-hoc • Last updated 2 weeks ago</p>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </aside>
                    </div>
                </div>
            </main>

            <footer class="border-t border-slate-200 bg-white">
                <div class="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
                    <p>© {{ date('Y') }} HomeCert Direct. All rights reserved.</p>
                    <p>Reminders are indicative only. Always ensure you meet your legal obligations.</p>
                </div>
            </footer>
        </div>
    </body>
</html>
