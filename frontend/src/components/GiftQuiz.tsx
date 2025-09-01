import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Gift, Heart, Briefcase, Users } from 'lucide-react';

interface GiftQuizProps {
  onClose: () => void;
  onRecommendation: (category: string, occasion: string) => void;
}

export function GiftQuiz({ onClose, onRecommendation }: GiftQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      id: 1,
      question: "Who are you shopping for?",
      options: [
        { text: "Romantic Partner", value: "romantic", icon: Heart },
        { text: "Family Member", value: "family", icon: Users },
        { text: "Friend", value: "friend", icon: Gift },
        { text: "Colleague/Boss", value: "professional", icon: Briefcase },
      ]
    },
    {
      id: 2,
      question: "What's the occasion?",
      options: [
        { text: "Birthday", value: "birthday", emoji: "🎂" },
        { text: "Anniversary", value: "anniversary", emoji: "💕" },
        { text: "Valentine's Day", value: "valentine", emoji: "💝" },
        { text: "Graduation", value: "graduation", emoji: "🎓" },
        { text: "Thank You", value: "thank-you", emoji: "🙏" },
        { text: "Just Because", value: "surprise", emoji: "✨" },
      ]
    },
    {
      id: 3,
      question: "What's your budget range?",
      options: [
        { text: "Under KSh 2,000", value: "low", emoji: "💡" },
        { text: "KSh 2,000 - 5,000", value: "medium", emoji: "💝" },
        { text: "KSh 5,000 - 10,000", value: "high", emoji: "🎁" },
        { text: "Above KSh 10,000", value: "premium", emoji: "💎" },
      ]
    },
    {
      id: 4,
      question: "Do you want to personalize it?",
      options: [
        { text: "Yes, make it personal", value: "personalized", emoji: "✨" },
        { text: "No, ready-made is fine", value: "ready", emoji: "📦" },
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate recommendation
      generateRecommendation([...newAnswers, answer]);
    }
  };

  const generateRecommendation = (allAnswers: string[]) => {
    const [recipient, occasion, budget, personalization] = allAnswers;
    
    let recommendedCategory = 'all';
    let recommendedOccasion = occasion;

    // Logic for category recommendation
    if (personalization === 'personalized') {
      recommendedCategory = 'personalized';
    } else if (recipient === 'romantic') {
      recommendedCategory = 'flowers';
    } else if (recipient === 'professional') {
      recommendedCategory = 'corporate';
    } else if (budget === 'premium' || budget === 'high') {
      recommendedCategory = 'hampers';
    } else {
      recommendedCategory = 'personalized';
    }

    onRecommendation(recommendedCategory, recommendedOccasion);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral via-pink-500 to-teal pt-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-float">
          <Gift className="h-16 w-16 text-white" />
        </div>
        <div className="absolute top-32 right-20 animate-float-delayed">
          <Heart className="h-12 w-12 text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float">
          <Users className="h-14 w-14 text-white" />
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-coral to-pink-500 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h1 className="text-2xl font-bold mb-2">🎯 Perfect Gift Finder</h1>
            <p className="opacity-90">Let's find the ideal gift in just 4 questions!</p>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm opacity-90 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl hover:border-coral hover:bg-coral-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {option.emoji ? (
                          <span className="text-2xl">{option.emoji}</span>
                        ) : (
                          IconComponent && <IconComponent className="h-6 w-6 text-coral" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{option.text}</span>
                      <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={goBack}
                disabled={currentQuestion === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  currentQuestion === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>

              <div className="text-sm text-gray-500 flex items-center">
                Select an option to continue
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-8 text-center">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-white">
            <h3 className="font-semibold mb-2">💡 Did You Know?</h3>
            <p className="text-sm opacity-90">
              Personalized gifts are 3x more likely to create lasting memories than generic ones!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}