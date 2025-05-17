import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Calendar,
  MessageSquare,
  BarChart3,
  Brain,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Gamepad2
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6936325/pexels-photo-6936325.jpeg?auto=compress&cs=tinysrgb&w=1600')] opacity-10 bg-center bg-cover"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Excellons ensemble
              </h1>
              <p className="text-lg mb-8 max-w-lg opacity-90">
                MIABO Madagascar est une entreprise sociale innovante qui modernise l'education a Madagascar et au-dela, grace a une platforme technologique, la pedagogie scoute et l'accompagnement psycho-social.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100">
                  Commencer gratuitement
                </Link>
                <Link to="/about" className="btn border border-white text-white hover:bg-white/10">
                  En savoir plus
                </Link>
              </div>

              <div className="mt-10 flex items-center space-x-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((num) => (
                    <img
                      key={num}
                      src={`https://i.pravatar.cc/100?img=${num + 10}`}
                      alt="Student"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center text-yellow-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-300" />
                    ))}
                  </div>
                  <p className="text-sm mt-1">De plus de 200+ élèves satisfaits</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden rotate-3 transform hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Students learning"
                  className="w-full object-cover h-80"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-medium">Des cours adaptés à tous les niveaux</p>
                </div>
              </div>

              <div className="glass-card absolute -bottom-10 -left-10 p-4 rounded-lg max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <BookOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-800 font-medium">Apprentissage personnalisé</h3>
                    <p className="text-sm text-gray-600">Adapté au style d'apprentissage de chaque élève</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Pourquoi choisir MIABO ?</h2>
              <p className="text-gray-600 text-lg">
                Notre approche combine le meilleur de l'enseignement traditionnel avec les technologies modernes pour offrir une expérience d'apprentissage inégalée.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Tuteurs qualifiés",
                description: "Des tuteurs soigneusement sélectionnés et formés pour s'adapter aux besoins spécifiques de chaque élève.",
                icon: <Users className="h-6 w-6 text-primary-600" />,
                delay: 0.1
              },
              {
                title: "Matching par IA",
                description: "Notre algorithme de matching connecte élèves et tuteurs en fonction de leur style d'apprentissage et objectifs.",
                icon: <Brain className="h-6 w-6 text-primary-600" />,
                delay: 0.2
              },
              {
                title: "Suivi des progrès",
                description: "Tableaux de bord intuitifs pour suivre la progression et ajuster les méthodes d'apprentissage.",
                icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
                delay: 0.3
              },
              {
                title: "Flexibilité horaire",
                description: "Organisez les sessions selon votre propre emploi du temps, en présentiel ou en ligne.",
                icon: <Calendar className="h-6 w-6 text-primary-600" />,
                delay: 0.4
              },
              {
                title: "Communication directe",
                description: "Messagerie intégrée pour échanger facilement entre tuteurs, élèves et parents.",
                icon: <MessageSquare className="h-6 w-6 text-primary-600" />,
                delay: 0.5
              },
              {
                title: "Ressources pédagogiques",
                description: "Accès à une bibliothèque de matériels et de ressources pour enrichir l'apprentissage.",
                icon: <BookOpen className="h-6 w-6 text-primary-600" />,
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm p-6 card-hover"
              >
                <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <a href="#" className="text-primary-600 font-medium flex items-center hover:text-primary-700">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
              <p className="text-gray-600 text-lg">
                En quelques étapes simples, trouvez le tuteur parfait et commencez votre parcours d'apprentissage personnalisé.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Inscrivez-vous",
                description: "Créez votre compte et complétez votre profil avec vos besoins et objectifs d'apprentissage.",
                delay: 0.1
              },
              {
                step: 2,
                title: "Trouvez un tuteur",
                description: "Utilisez notre système de matching pour trouver le tuteur idéal qui correspond à votre style d'apprentissage.",
                delay: 0.2
              },
              {
                step: 3,
                title: "Planifiez vos sessions",
                description: "Organisez vos sessions selon votre emploi du temps et vos disponibilités.",
                delay: 0.3
              },
              {
                step: 4,
                title: "Apprenez et progressez",
                description: "Suivez vos cours personnalisés et visualisez votre progression en temps réel.",
                delay: 0.4
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: step.delay }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-primary-600">
                    {step.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/register" className="btn btn-primary">
              Commencer maintenant
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Nos Services</h2>
              <p className="text-gray-600 text-lg">
                Découvrez notre gamme complète de services éducatifs personnalisés pour répondre aux besoins de chaque élève.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Soutien scolaire à domicile",
                description: "Des sessions individuelles adaptées au rythme et au style d'apprentissage de chaque élève, pour toutes les matières et tous les niveaux.",
                icon: <Users className="h-6 w-6 text-primary-600" />
              },
              {
                title: "Babysitting ludique",
                description: "Garde d'enfant, éveil, jeux éducatifs et sécurité des enfants.",
                icon: <Gamepad2 className="h-6 w-6 text-primary-600" />
              },
              {
                title: "Encadrement et activités extrascolaires",
                description: "Ateliers ludique, créativité, culture, sport, lecture, informatique, etc.",
                icon: <BookOpen className="h-6 w-6 text-primary-600" />
              },
              {
                title: "Assistance de vie psycho-sociale",
                description: "Accompagnement émotionnel, motivation, écoute active, et soutien adapté pour les enfants à besoins spécifiques (par exemple : enfants en situation de trisomie, troubles de l’apprentissage, etc.)",
                icon: <Brain className="h-6 w-6 text-primary-600" />
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-primary-100 transition-colors"
              >
                <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {/* <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle className="h-4 w-4 text-primary-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul> */}
                <button className="mt-6 text-primary-600 font-medium flex items-center hover:text-primary-700">
                  En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">À Propos de MIABO</h2>
              <p className="text-gray-600 mb-6">
                MIABO est né de la conviction que chaque élève mérite un accompagnement personnalisé pour réaliser son plein potentiel. Notre plateforme connecte les élèves avec des tuteurs qualifiés et passionnés.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Équipe Expérimentée</h3>
                    <p className="text-gray-600">Des tuteurs soigneusement sélectionnés et formés</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <Star className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Excellence Académique</h3>
                    <p className="text-gray-600">Un engagement envers la réussite de chaque élève</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <Brain className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Innovation Pédagogique</h3>
                    <p className="text-gray-600">Des méthodes d'apprentissage modernes et efficaces</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="MIABO Team"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold">98% de satisfaction</p>
                    <p className="text-sm text-gray-600">Parmi nos élèves</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Ce que disent nos élèves et parents</h2>
              <p className="text-white/80 text-lg">
                Découvrez comment MIABO a transformé l'expérience d'apprentissage de centaines d'élèves à Madagascar.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Soa Rakotomalala",
                role: "Parent d'élève",
                avatar: "https://i.pravatar.cc/150?img=32",
                quote: "Les tuteurs de MIABO ont permis à ma fille de reprendre confiance en elle en mathématiques. Sa moyenne est passée de 8 à 16 en seulement un trimestre !",
                delay: 0.1
              },
              {
                name: "Toky Andriamahefa",
                role: "Élève en terminale",
                avatar: "https://i.pravatar.cc/150?img=65",
                quote: "J'ai trouvé un tuteur qui correspond parfaitement à ma façon d'apprendre. Grâce à MIABO, j'ai réussi à intégrer l'école d'ingénieur que je visais.",
                delay: 0.2
              },
              {
                name: "Miora Randrianarisoa",
                role: "Parent d'élève",
                avatar: "https://i.pravatar.cc/150?img=48",
                quote: "L'interface de suivi des progrès est vraiment pratique. Je peux voir exactement ce que mon fils apprend et comment il progresse, même avec mon emploi du temps chargé.",
                delay: 0.3
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: testimonial.delay }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/90 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex text-yellow-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-300" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
              <p className="text-gray-600 mb-8">
                Une question ? N'hésitez pas à nous contacter. Notre équipe est là pour vous répondre et vous accompagner dans votre parcours éducatif.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Notre adresse</h3>
                    <p className="text-gray-600">Antananarivo, Madagascar</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:miabo.madagascar@outlook.com" className="text-gray-600 hover:text-primary-600">
                      miabo.madagascar@outlook.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <a href="tel:+261340924165" className="text-gray-600 hover:text-primary-600">
                      +261 34 09 241 65
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Horaires</h3>
                    <p className="text-gray-600">Lundi - Samedi: 8h00 - 18h00</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-6">Envoyez-nous un message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Votre message..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full flex items-center justify-center">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer le message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre parcours éducatif ?</h2>
                <p className="text-gray-600 mb-6">
                  Rejoignez MIABO dès aujourd'hui et découvrez comment notre approche personnalisée peut vous aider à atteindre vos objectifs académiques.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register" className="btn btn-primary">
                    S'inscrire gratuitement
                  </Link>
                  <Link to="/contact" className="btn btn-outline">
                    Nous contacter
                  </Link>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    "7 jours d'essai gratuit",
                    "Annulation facile à tout moment",
                    "Garantie satisfaction ou remboursé"
                  ].map((item, index) => (

                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary-500 mr-2" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Students learning together"
                  className="rounded-xl shadow-lg w-full object-cover h-80"
                />
                <div className="glass-card absolute -bottom-6 -right-6 p-4 rounded-lg max-w-xs shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((num) => (
                        <img
                          key={num}
                          src={`https://i.pravatar.cc/100?img=${num + 20}`}
                          alt="Student"
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-800 font-medium">+200 nouveaux élèves</p>
                      <p className="text-gray-600">ce mois-ci</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
