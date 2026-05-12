import { MessageCircle } from 'lucide-react';

const whatsappUrl = 'https://wa.me/923045595455';

export function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <MessageCircle size={24} />
    </a>
  );
}
