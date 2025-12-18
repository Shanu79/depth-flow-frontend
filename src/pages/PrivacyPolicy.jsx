import React from 'react';
import { Shield, Lock, Eye, Server, Cookie, UserCheck, FileText, Mail, Layers } from 'lucide-react';

const PrivacyPolicy = () => {

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 font-sans pt-20">
      
      {/* --- Background Ambient Effects --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-16">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
              Legal
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
             Privacy Policy
           </h1>
           <p className="text-slate-400">
             Last updated: <span className="text-white font-medium">01/12/2025</span>
           </p>
        </div>

        {/* --- Introduction --- */}
        <div className="prose prose-invert prose-lg max-w-none mb-16">
          <p className="text-slate-300 leading-relaxed text-lg">
            At <strong>Depthflow.io</strong>, your privacy is extremely important to us. We understand that you trust us 
            when you upload your images and use our AI tools, and we take that responsibility seriously. 
            This Privacy Policy explains, in simple terms, what information we collect, why we collect it, 
            and how we keep it safe.
          </p>
          <p className="text-slate-400 text-sm border-l-2 border-cyan-500 pl-4 mt-4">
            By using Depthflow.io, you agree to the practices described in this policy.
          </p>
        </div>

        {/* --- Main Content Sections --- */}
        <div className="space-y-12">
          
          {/* Section 1: Info Collection */}
          <section className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-cyan-400" />
              1. Information We Collect
            </h2>
            <p className="text-slate-400 mb-6">
              We collect only the information that is necessary to provide and improve our services.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800/50">
                <h3 className="font-bold text-white mb-2">a) Account Information</h3>
                <p className="text-sm text-slate-400">When you create an account, we collect your <strong>name</strong> and <strong>email address</strong> to manage your account and provide support.</p>
              </div>
              <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800/50">
                <h3 className="font-bold text-white mb-2">b) Uploaded Content</h3>
                <p className="text-sm text-slate-400">Images are processed by AI to generate results. We do not sell or publicly share your content. Images are stored temporarily for processing.</p>
              </div>
              <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800/50">
                <h3 className="font-bold text-white mb-2">c) Payment Information</h3>
                <p className="text-sm text-slate-400">Payments are processed by trusted third-party providers. We <strong>do not store</strong> your credit card details on our servers.</p>
              </div>
              <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800/50">
                <h3 className="font-bold text-white mb-2">d) Usage Data</h3>
                <p className="text-sm text-slate-400">We collect basic data like pages visited, features used, and device type to fix bugs and improve performance.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Usage */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Layers className="w-6 h-6 text-purple-400" />
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
              <li>Provide and operate our AI services</li>
              <li>Process subscriptions and payments</li>
              <li>Improve platform quality and reliability</li>
              <li>Respond to support requests and inquiries</li>
              <li>Send service-related notifications (not spam)</li>
            </ul>
            <p className="mt-4 text-slate-500 text-sm italic">We do not use your data for unrelated purposes.</p>
          </section>

          {/* Section 3: Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              3. Data Security
            </h2>
            <p className="text-slate-400 leading-relaxed">
              We use reasonable technical and organizational measures to protect your data from 
              unauthorized access, loss, or misuse. While no online service can guarantee 100% security, 
              we continuously work to keep your information safe.
            </p>
          </section>

          {/* Section 4: Third Party */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Server className="w-6 h-6 text-blue-400" />
              4. Third-Party Services
            </h2>
            <p className="text-slate-400 mb-2">Depthflow.io may use trusted third-party services such as:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 ml-2 mb-4">
              <li>Payment processors</li>
              <li>Analytics tools</li>
              <li>Cloud infrastructure providers</li>
            </ul>
            <p className="text-slate-400 text-sm">These services are required to follow industry-standard data protection practices.</p>
          </section>

          {/* Section 5: Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-amber-400" />
              5. Cookies
            </h2>
            <p className="text-slate-400 mb-2">We may use cookies to:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 ml-2 mb-4">
              <li>Keep you logged in</li>
              <li>Understand how users interact with our site</li>
              <li>Improve functionality and performance</li>
            </ul>
            <p className="text-slate-400 text-sm">You can disable cookies in your browser settings if you prefer.</p>
          </section>

          {/* Section 6: Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-pink-400" />
              6. Your Rights
            </h2>
            <p className="text-slate-400 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 ml-2">
              <li>Request access to your personal data</li>
              <li>Request correction or deletion of your data</li>
              <li>Cancel your account at any time</li>
            </ul>
          </section>

          {/* Section 7: Changes */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-slate-400" />
              7. Changes to This Policy
            </h2>
            <p className="text-slate-400">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page 
              with a revised date.
            </p>
          </section>

          {/* Section 8: Contact */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-12">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-cyan-400" />
              8. Contact Us
            </h2>
            <p className="text-slate-400 mb-6">
              If you have any questions or concerns about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;