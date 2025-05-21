import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, CalendarCheck, ChevronRight } from "lucide-react";

export default function ContactSupport({
  ConfigData,
  investorRelations,
  nameInput,
  setNameInput,
  emailInput,
  setEmailInput,
  phoneInput,
  setPhoneInput,
  dateInput,
  setDateInput,
  messageInput,
  setMessageInput,
  handleSiteVisitSubmit,
}: any) {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
      <div className="border-l-4 border-estates-primary pl-4 mb-8">
        <h2 className="text-3xl font-bold text-estates-secondary">
          Contact & Support
        </h2>
        <p className="text-gray-600 mt-2">
          Get in touch with our investor relations team
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-estates-secondary">
            Investor Relations
          </h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-estates-primary/10 p-3 rounded-lg mr-4">
                <Phone className="h-5 w-5 text-estates-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Contact Details</h4>
                {ConfigData?.phones &&
                  ConfigData.phones.map((phone: any, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="text-gray-600">
                        {phone.label && (
                          <span className="text-gray-600">{phone.label}:&nbsp;</span>
                        )}
                        {phone.number}
                      </div>
                    </li>
                  ))}
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-estates-primary/10 p-3 rounded-lg mr-4">
                <CalendarCheck className="h-5 w-5 text-estates-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Upcoming Events</h4>
                <div className="mt-2 space-y-3">
                  {investorRelations?.events.map((event: any) => (
                    <div
                      key={event.id}
                      className="bg-estates-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow"
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {event.date} • {event.time} NPT
                      </p>
                      <Button
                        variant="link"
                        className="text-estates-primary p-0 mt-1 flex items-center gap-1 text-sm"
                        asChild
                      >
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register Now <ChevronRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Schedule a Site Visit Form */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-estates-secondary">
            Schedule a Site Visit
          </h3>
          <form onSubmit={handleSiteVisitSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input id="name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="w-full" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input id="email" type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input id="phone" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} className="w-full" required />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Visit Date
              </label>
              <Input id="date" type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} className="w-full" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Any specific requests or questions?
              </label>
              <textarea
                id="message"
                rows={3}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>
            <Button className="w-full py-6 bg-estates-primary hover:bg-estates-primary/90 text-white" type="submit">
              Schedule Visit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}