import { Scale, CheckCircle, AlertTriangle, CreditCard, Copyright, Server, ShieldAlert, FileText, Mail, UserCheck } from 'lucide-react';

const Terms = () => {

  return (
    <div className="min-h-screen bg-[#050511] text-white selection:bg-cyan-500/30 font-sans pt-20">
      
      {/* --- Background Ambient Effects --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-16">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
              Legal
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
             Terms of Service
           </h1>
           <p className="text-slate-400">
             Last updated: <span className="text-white font-medium">01/12/2025</span>
           </p>
        </div>

        {/* --- Introduction --- */}
        <div className="prose prose-invert prose-lg max-w-none mb-16">
          <p className="text-slate-300 leading-relaxed text-lg">
            Welcome to <strong>Depthflow.io</strong>. These Terms of Service explain the rules and conditions for using 
            our platform. By accessing or using our website and services, you agree to these terms.
          </p>
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mt-4 flex items-start gap-3">
             <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
             <p className="text-red-200 text-sm m-0">
               If you do not agree with any part of these terms, please do not use the service.
             </p>
          </div>
        </div>

        {/* --- Main Content Sections --- */}
        <div className="space-y-12">
          
          {/* 1. Service Overview */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-cyan-400" />
              1. Service Overview
            </h2>
            <p className="text-slate-400 mb-2">
              Depthflow.io provides AI-powered tools that convert 2D images into depth-based and 3D-style 
              visual effects. Results may vary depending on image quality, content, and processing conditions.
            </p>
            <p className="text-slate-500 text-sm italic">
              We continuously improve our tools, which means features may change or evolve over time.
            </p>
          </section>

          {/* 2. User Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-purple-400" />
              2. User Eligibility
            </h2>
            <p className="text-slate-400 mb-4">By using Depthflow.io, you confirm that:</p>
            <ul className="grid gap-3">
               {[
                 "You are at least 18 years old, or have permission from a legal guardian",
                 "You have the legal right to use this service",
                 "You agree to comply with all applicable laws"
               ].map((item, i) => (
                 <li key={i} className="flex gap-3 text-slate-300 bg-slate-900/30 p-3 rounded-lg border border-slate-800">
                    <CheckCircle className="w-5 h-5 text-purple-400 shrink-0" />
                    {item}
                 </li>
               ))}
            </ul>
          </section>

          {/* 3. User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Scale className="w-6 h-6 text-blue-400" />
              3. User Responsibilities
            </h2>
            <p className="text-slate-400 mb-4">You agree that:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2 mb-4">
               <li>You own or have proper rights to upload any content you submit</li>
               <li>You will not upload illegal, harmful, offensive, or copyrighted material without permission</li>
               <li>You will not misuse the platform for unlawful or abusive purposes</li>
            </ul>
            <p className="text-slate-400 text-sm font-medium border-l-2 border-blue-500 pl-4">
              You are solely responsible for the content you upload.
            </p>
          </section>

          {/* 4. Payments */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-emerald-400" />
              4. Payments and Subscriptions
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2 mb-4">
               <li>Paid plans are billed on a monthly or yearly basis, depending on your selection</li>
               <li>Subscriptions renew automatically unless canceled before the next billing date</li>
               <li>All prices are displayed clearly before payment</li>
               <li>Payments are generally non-refundable unless otherwise required by law</li>
            </ul>
            <p className="text-slate-500 text-sm">
              You can manage or cancel your subscription through your account settings.
            </p>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Copyright className="w-6 h-6 text-amber-400" />
              5. Intellectual Property
            </h2>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
               <div>
                 <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-1 text-cyan-400">Our Rights</h3>
                 <p className="text-slate-400 text-sm">Depthflow.io owns all rights to the platform, software, design, and branding. You may not copy, resell, or redistribute the platform itself.</p>
               </div>
               <div className="w-full h-px bg-slate-800"></div>
               <div>
                 <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-1 text-purple-400">Your Rights</h3>
                 <p className="text-slate-400 text-sm">You retain ownership of your uploaded images. Generated outputs belong to you, subject to your selected plan and usage rights.</p>
               </div>
            </div>
          </section>

          {/* 6. Availability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Server className="w-6 h-6 text-pink-400" />
              6. Service Availability
            </h2>
            <p className="text-slate-400">
              While we aim to provide reliable service, we do not guarantee uninterrupted or error-free 
              access. Maintenance, updates, or technical issues may temporarily affect availability.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-red-400" />
              7. Limitation of Liability
            </h2>
            <p className="text-slate-300 mb-2">
              Depthflow.io is provided “as is” and “as available.” We are not responsible for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2 mb-4">
              <li>Any loss of data</li>
              <li>Business losses</li>
              <li>Indirect or consequential damages</li>
            </ul>
            <p className="text-slate-300 font-medium">Use of the service is at your own risk.</p>
          </section>

          {/* 8. Account Suspension */}
          <section>
             <h2 className="text-xl font-bold text-white mb-2">8. Account Suspension or Termination</h2>
             <p className="text-slate-400 mb-2">We reserve the right to suspend or terminate accounts that:</p>
             <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
               <li>Violate these terms</li>
               <li>Abuse the platform</li>
               <li>Engage in fraudulent or harmful behavior</li>
             </ul>
          </section>

          {/* 9. Changes */}
          <section>
             <h2 className="text-xl font-bold text-white mb-2">9. Changes to These Terms</h2>
             <p className="text-slate-400">
               We may update these Terms of Service as needed. Continued use of Depthflow.io after 
               changes means you accept the updated terms.
             </p>
          </section>

          {/* 10. Contact */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-12">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-cyan-400" />
              10. Contact Information
            </h2>
            <p className="text-slate-400 mb-6">
              For any questions regarding these Terms, please contact:
            </p>
            <a 
              href="mailto:support@depthflow.io" 
              className="inline-flex items-center gap-2 text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3 rounded-xl transition-all font-medium"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              support@depthflow.io
            </a>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;